import Dropzone from "@/components/Dropzone";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-20 bg-slate-100">
      <h1 className="font-extrabold text-4xl text-neutral-800 text-center w-auto md:w-2/3 md:text-6xl">
        The all-in-one solution for your event access list.
      </h1>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl text-center text-neutral-600 font-bold">
          Genera Codici QR
        </h2>
        <Dropzone />
      </section>
    </div>
  );
}
