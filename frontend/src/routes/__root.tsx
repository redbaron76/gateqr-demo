import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex justify-between items-center py-2">
        <div className="px-2">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="GATE-QR"
              width={96}
              height={26}
              className="w-24 h-auto"
            />
          </Link>
        </div>
        <div className="divide-x">
          <Link to="/" className="px-2 [&.active]:font-semibold">
            Generator
          </Link>
          <Link to="/scanner" className="px-2 [&.active]:font-semibold">
            Scanner
          </Link>
        </div>
      </div>
      <hr />
      <Outlet />
    </div>
  ),
});
