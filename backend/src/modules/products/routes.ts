import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (_req, res) => {
  res.json(await prisma.product.findMany());
});

router.post("/", authenticate, authorize("ADMIN", "MANAGER"), async (req, res) => {
  const schema = z.object({ sku: z.string(), name: z.string(), description: z.string().optional(), price: z.number().positive() });
  const product = await prisma.product.create({ data: schema.parse(req.body) });
  res.status(201).json(product);
});

export default router;
