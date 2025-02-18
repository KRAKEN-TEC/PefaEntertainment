import { useState } from "react";
import "./CSS/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    dob: { year: "", month: "", day: "" },
    phone: "+66",
    password: "",
    repeatPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDobChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "year" | "month" | "day"
  ) => {
    setForm((prev) => ({
      ...prev,
      dob: { ...prev.dob, [field]: e.target.value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      return;
    }

    if (form.password !== form.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering:", form);
    console.log("hii james");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src="/logo.png" alt="PEFA Logo" className="logo" />
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email or Username"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="dob-fields">
            <input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={form.dob.year}
              onChange={(e) => handleDobChange(e, "year")}
              required
            />
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              value={form.dob.month}
              onChange={(e) => handleDobChange(e, "month")}
              required
            />
            <input
              type="text"
              placeholder="DD"
              maxLength={2}
              value={form.dob.day}
              onChange={(e) => handleDobChange(e, "day")}
              required
            />
          </div>

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
