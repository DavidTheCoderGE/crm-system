import { Router } from "express";
import { prisma } from "../../config/prisma.js";
import { authenticate, authorize } from "../../middleware/auth.js";

const router = Router();

router.get("/kpis", authenticate, authorize("ADMIN", "MANAGER"), async (_req, res) => {
  const [users, products, salesOrders, totalPayments] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.salesOrder.count(),
    prisma.payment.aggregate({ _sum: { amount: true } })
  ]);
  res.json({ users, products, salesOrders, revenue: totalPayments._sum.amount || 0 });
});

export default router;
