import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  function handleLogout() {
    localStorage.removeItem("login");
    localStorage.removeItem("currentUser");
    navigate("/");
  }

  return (
    <div
      className="
      fixed
      top-0
      left-64
      right-0
      h-20
      bg-white
      shadow
      flex
      items-center
      justify-between
      px-8
      z-50
      "
    >
      <div>
        <input
          className="
          border
          rounded-lg
          p-3
          w-80
          "
          placeholder="Search here..."
        />
      </div>

      <div className="flex gap-5 items-center">
        <span className="cursor-pointer">☀️</span>
        <span className="cursor-pointer">🌐</span>
        <span className="cursor-pointer">🔔</span>

        <div className="text-right">
          <h3 className="font-bold leading-tight">
            {currentUser?.fullName || "User"}
          </h3>
          <p className="text-sm text-slate-500 leading-tight">
            {currentUser?.email || ""}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-2
          bg-red-600
          hover:bg-red-700
          active:scale-95
          text-white
          font-semibold
          px-5
          py-2.5
          rounded-lg
          shadow-md
          shadow-red-200
          transition
          "
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
