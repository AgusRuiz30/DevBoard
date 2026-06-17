import { Outlet } from "react-router";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-light text-primary">
      <div className="flex">
        <Sidebar />

        <main className="flex min-h-screen flex-1 flex-col">
          <Header />

          <section className="p-6">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
