import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <div className="app">
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
