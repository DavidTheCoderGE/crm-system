import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { api } from "../api/client";

export const DashboardPage = () => {
  const [kpis, setKpis] = useState({ users: 0, products: 0, salesOrders: 0, revenue: 0 });

  useEffect(() => {
    api.get("/reporting/kpis").then((r) => setKpis(r.data)).catch(() => undefined);
  }, []);

  const chartData = [
    { name: "Nutzer", value: kpis.users },
    { name: "Produkte", value: kpis.products },
    { name: "Sales", value: kpis.salesOrders }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Umsatz: {kpis.revenue.toFixed(2)} €</p>
      <div style={{ width: "100%", height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
