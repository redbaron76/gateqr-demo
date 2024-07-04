import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

import Language from "@/components/Language";
import { Translation } from "react-i18next";

export const Route = createRootRoute({
  component: () => (
    <Translation>
      {(t) => (
        <div className="flex flex-col min-h-[100dvh]">
          <div className="flex justify-between items-center py-2">
            <div className="px-2">
              <Link to="/">
                <img
                  src="/logo.svg"
                  alt="GATE:QR"
                  width={96}
                  height={26}
                  className="w-24 h-auto"
                />
              </Link>
            </div>
            <div className="flex divide-x items-center">
              <Link
                to="/"
                className="px-2 [&.active]:font-bold [&.active]:uppercase"
              >
                {t("root.generator")}
              </Link>
              <Link
                to="/scanner"
                className="px-2 [&.active]:font-bold [&.active]:uppercase"
              >
                {t("root.scanner")}
              </Link>
              <div className="flex justify-center items-center px-2">
                <Language />
              </div>
            </div>
          </div>
          <hr />
          <Outlet />
        </div>
      )}
    </Translation>
  ),
});
