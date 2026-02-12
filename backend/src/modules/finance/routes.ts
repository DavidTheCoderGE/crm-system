import { Router } from "express";
import { z } from "zod";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.post("/invoices", authenticate, authorize("ADMIN", "MANAGER"), async (req, res) => {
  const schema = z.object({ salesOrderId: z.number().int(), totalAmount: z.number().positive() });
  const invoice = await prisma.invoice.create({ data: schema.parse(req.body) });
  res.status(201).json(invoice);
});

router.post("/payments", authenticate, authorize("ADMIN", "MANAGER"), async (req, res) => {
  const schema = z.object({ invoiceId: z.number().int(), amount: z.number().positive(), method: z.string() });
  const payment = await prisma.payment.create({ data: schema.parse(req.body) });
  res.status(201).json(payment);
});

router.get("/payments", authenticate, async (_req, res) => {
  res.json(await prisma.payment.findMany({ include: { invoice: true } }));
});

export default router;
