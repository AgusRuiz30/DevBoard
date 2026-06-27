import { BrowserRouter, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import Task from "./pages/task.jsx";
import { Notices } from "./pages/Notices.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/task" element={<Task />} />
            <Route path="/notices" element={<Notices />} />
            {/* <Route path="/bugs" element={<Bugs />} /> */}
            {/* <Route path="/reports" element={<Reports />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
