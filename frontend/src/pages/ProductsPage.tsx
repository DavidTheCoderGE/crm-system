import { useEffect, useState } from "react";
import { api } from "../api/client";

interface Product { id: number; sku: string; name: string; price: number }

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get("/products").then((r) => setProducts(r.data)).catch(() => undefined);
  }, []);

  return (
    <div>
      <h1>Produkte</h1>
      <table>
        <thead><tr><th>SKU</th><th>Name</th><th>Preis</th></tr></thead>
        <tbody>{products.map((p) => <tr key={p.id}><td>{p.sku}</td><td>{p.name}</td><td>{p.price}</td></tr>)}</tbody>
      </table>
    </div>
  );
};
