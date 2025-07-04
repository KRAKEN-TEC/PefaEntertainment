import { useState } from "react";
import "../CSS/Register.css";
import { useUserActions } from "@/hooks/useUser";
import logo from "@/assets/PEFA-black.svg";
import { useNavigate } from "react-router";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
    agreeTerms: false,
  });
  const { alert, handleRegister } = useUserActions();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(form.password)) {
      window.alert("စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရမည်၊ အင်္ဂလိပ်အက္ခရာဖြစ်ရမည်၊ စလုံးကြီးတစ်လုံး င်္သေကတစ်လုံး ဂဏန်းတစ်လုံး ပါဝင်ရမည်။\n\nဥပမာ - Abcde123$");
      return;
    }

    if (form.password !== form.repeatPassword) {
      window.alert("စကားဝှက်နှစ်ခု ကိုက်ညီမူ့ မရှိပါ!");
      return;
    }

    const { repeatPassword, agreeTerms, ...rest } = form;
    handleRegister(rest);
    setTimeout(() => { navigate("/") }, 1000);
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
            placeholder="Can be blank"
            value={form.phone}
            onChange={handleChange}
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
