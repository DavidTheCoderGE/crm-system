import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (_req, res) => {
  res.json(await prisma.purchaseOrder.findMany({ include: { items: true } }));
});

router.post("/", authenticate, authorize("ADMIN", "MANAGER"), async (req, res) => {
  const schema = z.object({ supplier: z.string(), items: z.array(z.object({ productId: z.number(), quantity: z.number(), unitCost: z.number() })) });
  const input = schema.parse(req.body);
  const order = await prisma.purchaseOrder.create({
    data: {
      supplier: input.supplier,
      status: "OPEN",
      orderedBy: req.user!.id,
      items: { create: input.items }
    },
    include: { items: true }
  });
  res.status(201).json(order);
});

export default router;
