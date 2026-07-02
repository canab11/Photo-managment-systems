import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    api
      .get("/Users")
      .then((res) => {
        const users = Array.isArray(res.data) ? res.data : [];

        const matchedUser = users.find(
          (u) =>
            u.email?.toLowerCase() === email.toLowerCase() &&
            u.password === password
        );

        if (matchedUser) {
          localStorage.setItem("login", "true");
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              userID: matchedUser.userID,
              fullName: matchedUser.fullName,
              email: matchedUser.email,
            })
          );
          navigate("/dashboard");
        } else {
          setError("Email ama Password waa khalad");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Kama xirmi karo backend-ka. Hubi in server-ku shaqeynayo.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-50
      via-white
      to-indigo-50
      px-4
      "
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-slate-900"
          >
            <span>📷</span> PhotoApp
          </Link>
        </div>

        <form
          onSubmit={handleLogin}
          className="
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          border
          border-slate-100
          "
        >
          <h1 className="text-2xl font-bold mb-1 text-center text-slate-900">
            Ku Soo Dhawoow
          </h1>
          <p className="text-center text-slate-500 text-sm mb-6">
            Gal akoonkaaga si aad u gasho Dashboard-ka
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg mb-4 border border-red-100">
              {error}
            </div>
          )}

          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Geli email-kaaga"
            className="
            border
            border-slate-200
            p-3
            w-full
            mb-4
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Geli password-kaaga"
            className="
            border
            border-slate-200
            p-3
            w-full
            mb-6
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="
            bg-blue-600
            hover:bg-blue-700
            active:scale-[0.99]
            disabled:opacity-60
            text-white
            font-semibold
            w-full
            p-3.5
            rounded-lg
            shadow-lg
            shadow-blue-200
            transition
            "
          >
            {loading ? "Gelaya..." : "Login"}
          </button>

          <Link
            to="/"
            className="block text-center text-sm text-slate-500 hover:text-blue-600 mt-5"
          >
            ← Ku noqo Home
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
