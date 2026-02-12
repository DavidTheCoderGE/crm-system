import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (_req, res) => {
  res.json(await prisma.salesOrder.findMany({ include: { items: true, invoice: true } }));
});

router.post("/", authenticate, authorize("ADMIN", "MANAGER", "EMPLOYEE"), async (req, res) => {
  const schema = z.object({ customer: z.string(), items: z.array(z.object({ productId: z.number(), quantity: z.number(), unitPrice: z.number() })) });
  const input = schema.parse(req.body);
  const order = await prisma.salesOrder.create({
    data: {
      customer: input.customer,
      status: "OPEN",
      soldBy: req.user!.id,
      items: { create: input.items }
    },
    include: { items: true }
  });
  res.status(201).json(order);
});

export default router;
