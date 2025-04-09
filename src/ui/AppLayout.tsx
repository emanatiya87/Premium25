import { Outlet } from "react-router";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#333333] to-[#8B1313] px-48 flex flex-col">
      <Header />
      <main>{<Outlet />}</main>
    </div>
  );
}

export default AppLayout;
