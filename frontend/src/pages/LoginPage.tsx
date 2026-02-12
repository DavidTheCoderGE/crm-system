import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { authStore } from "../store/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      authStore.login(response.data.token);
      navigate("/");
    } catch {
      setError("Login fehlgeschlagen");
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h1>ERP Login</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-Mail" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Passwort" />
      <button type="submit">Anmelden</button>
      {error && <p>{error}</p>}
    </form>
  );
};
