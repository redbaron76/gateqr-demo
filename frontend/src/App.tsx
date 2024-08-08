import { type AppRouter } from "@/router";
import React from "react";
import { RouterProvider } from "@tanstack/react-router";

type AppProps = {
  router: AppRouter;
};

const App: React.FC<AppProps> = ({ router }) => {
  return <RouterProvider router={router} />;
};

export default App;
