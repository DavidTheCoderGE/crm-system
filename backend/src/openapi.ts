export const openApiSpec = {
  openapi: "3.0.0",
  info: { title: "ERP API", version: "1.0.0" },
  paths: {
    "/api/auth/login": { post: { summary: "Login user" } },
    "/api/products": { get: { summary: "List products" }, post: { summary: "Create product" } },
    "/api/reporting/kpis": { get: { summary: "Get KPI report" } }
  }
};
