import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getError } from "../utils/helpers";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-cobalt focus:outline-none";

export default function LoginPage() {
  const { user, login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  if (user) return <Navigate to="/" replace />;

  const isLogin = mode === "login";

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const switchMode = (m) => {
    setMode(m);
    setError("");
    setNotice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (form.password.length < 4) {
      setError("Parol kamida 4 ta belgidan iborat bo'lsin");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) await login(form.email, form.password);
      else await register(form);
      navigate("/");
    } catch (err) {
      if (err.code === "NO_ACCOUNT") {
        // bunday email yo'q → ro'yxatdan o'tkazamiz
        setMode("register");
        setNotice("Bu email bilan hisob topilmadi. Ismingizni kiriting va ro'yxatdan o'ting.");
      } else if (err.code === "EMAIL_TAKEN") {
        // email band → kirishga o'tkazamiz
        setMode("login");
        setNotice("Bu email allaqachon ro'yxatdan o'tgan. Parolni kiriting va kiring.");
      } else if (err.code === "WRONG_PASSWORD") {
        setError("Parol noto'g'ri");
      } else {
        setError(getError(err, isLogin ? "Kirib bo'lmadi" : "Ro'yxatdan o'tib bo'lmadi"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-4xl overflow-hidden px-4 py-10 md:grid-cols-2 md:py-16">
      <div className="tile-pattern hidden flex-col justify-end rounded-l-3xl p-10 text-white md:flex">
        <h2 className="font-display text-3xl font-extrabold leading-tight">
          Hisobingiz bormi? Email va parol yetarli.
        </h2>
        <p className="mt-3 text-white/85">
          Yo'q bo'lsa, bir daqiqada ro'yxatdan o'ting — keyingi safar faqat kirasiz.
        </p>
      </div>

      <div className="rounded-3xl border border-line bg-white p-6 sm:p-10 md:rounded-l-none">
        <div className="mb-6 grid grid-cols-2 rounded-full bg-paper p-1">
          {[
            ["login", "Kirish"],
            ["register", "Ro'yxatdan o'tish"],
          ].map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                mode === m ? "bg-cobalt text-white" : "text-muted hover:text-ink"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Ism</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={inputClass}
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-semibold">Parol</span>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
                className={`${inputClass} pr-20`}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-cobalt"
              >
                {showPass ? "Yashirish" : "Ko'rsatish"}
              </button>
            </div>
          </label>

          {notice && (
            <p role="status" className="rounded-xl bg-turq/10 px-4 py-3 text-sm text-ink">
              {notice}
            </p>
          )}
          {error && (
            <p role="alert" className="rounded-xl bg-anor/10 px-4 py-3 text-sm text-anor">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full rounded-full bg-cobalt py-3 font-semibold text-white hover:bg-cobalt-deep disabled:opacity-60"
          >
            {loading ? "Kuting..." : isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
          </button>
        </form>
      </div>
    </div>
  );
}
