import { Router } from "express";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, authorize("ADMIN", "MANAGER"), async (_req, res) => {
  const users = await prisma.user.findMany({ include: { role: true } });
  res.json(users.map((u) => ({ id: u.id, email: u.email, fullName: u.fullName, role: u.role.name })));
});

export default router;
