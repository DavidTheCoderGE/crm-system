import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./modules/auth/routes.js";
import userRoutes from "./modules/users/routes.js";
import productRoutes from "./modules/products/routes.js";
import inventoryRoutes from "./modules/inventory/routes.js";
import purchasesRoutes from "./modules/purchases/routes.js";
import salesRoutes from "./modules/sales/routes.js";
import financeRoutes from "./modules/finance/routes.js";
import reportingRoutes from "./modules/reporting/routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { openApiSpec } from "./openapi.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/openapi.json", (_req, res) => res.json(openApiSpec));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/reporting", reportingRoutes);

app.use(errorHandler);
