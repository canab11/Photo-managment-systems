import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-28 px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
