import { Link, Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="layout">
    <aside>
      <h2>ERP</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/products">Produkte</Link>
        <Link to="/inventory">Lager</Link>
        <Link to="/sales">Verkauf</Link>
      </nav>
    </aside>
    <main>
      <Outlet />
    </main>
  </div>
);
