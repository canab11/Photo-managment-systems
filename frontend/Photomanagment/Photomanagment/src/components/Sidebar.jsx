import { Link, useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("login");
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/users", label: "Users", icon: "👤" },
    { to: "/albums", label: "Albums", icon: "📁" },
    { to: "/photos", label: "Photos", icon: "🖼" },
    { to: "/categories", label: "Categories", icon: "📂" },
  ];

  return (
    <div
      className="
      fixed
      left-0
      top-0
      h-screen
      w-64
      bg-slate-950
      text-white
      p-6
      flex
      flex-col
      "
    >
      <h1 className="text-2xl font-bold mb-10 flex items-center gap-2">
        <span>📷</span> Photo App
      </h1>

      <div className="space-y-2 flex-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="pt-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-red-600
          hover:bg-red-700
          text-white
          font-semibold
          p-3
          rounded-lg
          transition
          shadow-md
          shadow-red-900/30
          "
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
