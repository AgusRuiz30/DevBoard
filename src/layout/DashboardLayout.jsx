import { Outlet, useLocation } from "react-router";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          <section key={location.pathname} className="outlet-animation p-5">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
