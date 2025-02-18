import React, { useState } from "react";
import "./CSS/Login.css";
import { FetchUser, useUserActions } from "@/hooks/useUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, alert, loading } = useUserActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });

  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/logo.png" alt="PEFA Logo" className="logo" />

        <h2>Login</h2>
        <form onSubmit={handleSubmit}>

          {alert && <h1>{alert}</h1>}

          <input
            type="email"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
