import { Button } from "@/components/ui/button";
import Dropzone from "@/components/Dropzone";
import { Link } from "@tanstack/react-router";
import { QrCodeIcon } from "@heroicons/react/24/solid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-5 md:gap-20 bg-gradient-to-b from-slate-200 to-white">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <h1 className="font-extrabold text-3xl text-neutral-800 text-center w-auto px-6 md:w-3/4 md:text-6xl">
          The all-in-one solution for managing entrance access.
        </h1>
        <h2 className="font-light text-center px-8 md:text-lg">
          You provide the guest list, we deliver{" "}
          <span className="underline">print-ready</span> QR codes and an access
          scanner.
        </h2>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl text-center text-neutral-600 font-bold">
          Generate your QR Codes
        </h2>
        <Dropzone />
      </section>

      <Button asChild size="lg" className=" bg-neutral-800 rounded-xl">
        <Link to="/scanner" className="flex items-center gap-1">
          <QrCodeIcon className="size-5 mr-2" />
          QR Code Scanner
        </Link>
      </Button>
    </div>
  );
}
