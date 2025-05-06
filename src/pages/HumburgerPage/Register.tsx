import { useState } from "react";
import "../CSS/Register.css";
import { useUserActions } from "@/hooks/useUser";
import logo from "@/assets/PEFA-black.svg";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+66",
    password: "",
    repeatPassword: "",
    agreeTerms: false,
  });
  const { alert } = useUserActions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // if (!passwordRegex.test(form.password)) {
    //   return;
    // }

    // if (form.password !== form.repeatPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }
    console.log("Registering:", form);
    // handleRegister(form);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logo} />
        <h2>Register</h2>

        {/* COMMENTING ERROR */}
        {alert && <h1>{alert}</h1>}

        <form onSubmit={handleSubmit}>
          <input
            type="name"
            name="name"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat-password"
            value={form.repeatPassword}
            onChange={handleChange}
            required
          />

          <label className="terms">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              required
            />
            By signing up, you agree to our <a href="#">Terms</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
