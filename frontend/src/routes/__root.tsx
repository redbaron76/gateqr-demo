import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex justify-between py-1">
        <Link to="/">
          <span className="font-extrabold px-2">GATE:QR</span>
        </Link>
        <div className="divide-x">
          <Link to="/" className="px-2 [&.active]:font-semibold">
            QR Generator
          </Link>
          <Link to="/scanner" className="px-2 [&.active]:font-semibold">
            CODE Scanner
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  ),
});
