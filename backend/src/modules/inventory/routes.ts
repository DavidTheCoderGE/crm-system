import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (_req, res) => {
  res.json(await prisma.inventory.findMany({ include: { product: true, warehouse: true } }));
});

router.post("/", authenticate, authorize("ADMIN", "MANAGER", "EMPLOYEE"), async (req, res) => {
  const schema = z.object({ productId: z.number().int(), warehouseId: z.number().int(), quantity: z.number().int() });
  const input = schema.parse(req.body);
  const item = await prisma.inventory.upsert({
    where: { productId_warehouseId: { productId: input.productId, warehouseId: input.warehouseId } },
    update: { quantity: input.quantity },
    create: input
  });
  res.status(201).json(item);
});

export default router;
