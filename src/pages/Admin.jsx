import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <h1 className="font-serif text-3xl font-bold">
        Panel de administración
      </h1>

      <Outlet />
    </section>
  );
}

export default Admin;
