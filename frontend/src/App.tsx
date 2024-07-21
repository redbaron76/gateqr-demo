import { AppRouter } from "./router";
import { I18nextProvider } from "react-i18next";
import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import i18n from "./i18n";

// Create a new router instance
// const router = createRouter({ routeTree });

// Register the router instance for type safety
/* declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
} */

type AppProps = {
  router: AppRouter;
};

const App: React.FC<AppProps> = ({ router }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  );

  /* const [counter, setCounter] = React.useState(0);

  return (
    <div className="bg-lime-200 h-[100dvh]">
      <h1 className="text-4xl font-bold">App di test</h1>
      <p>Per vedere se funziona qualcosa</p>
      <button onClick={() => setCounter(counter + 1)}>
        Counter: {counter}
      </button>
    </div>
  );*/
};

/* const App = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <div className="bg-lime-200 h-[100dvh]">
      <h1 className="text-4xl font-bold">App di test</h1>
      <p>Per vedere se funziona qualcosa</p>
      <button onClick={() => setCounter(counter + 1)}>
        Counter: {counter}
      </button>
    </div>
  );
}; */

export default App;
