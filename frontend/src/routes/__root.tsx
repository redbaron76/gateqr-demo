import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex divide-x py-1">
        <span className="font-extrabold px-2">
          GATE-QR<span className="text-xs">.com</span>
        </span>
        <Link to="/" className="px-2 [&.active]:font-semibold">
          Genera codici
        </Link>
        <Link to="/scanner" className="px-2 [&.active]:font-semibold">
          Scanner
        </Link>
      </div>
      <hr />
      <Outlet />
    </div>
  ),
});
