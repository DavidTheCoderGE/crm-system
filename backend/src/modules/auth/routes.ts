import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE", "GUEST"]).default("GUEST")
});

router.post("/register", async (req, res) => {
  const input = registerSchema.parse(req.body);
  const role = await prisma.role.upsert({ where: { name: input.role }, update: {}, create: { name: input.role } });
  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: { email: input.email, fullName: input.fullName, passwordHash, roleId: role.id },
    include: { role: true }
  });
  res.status(201).json({ id: user.id, email: user.email, role: user.role.name });
});

router.post("/login", async (req, res) => {
  const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
  const { email, password } = schema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Ungültige Zugangsdaten" });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role.name }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
  res.json({ token });
});

export default router;
