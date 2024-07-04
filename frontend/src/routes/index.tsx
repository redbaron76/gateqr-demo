import { Button } from "@/components/ui/button";
import { CameraIcon } from "@heroicons/react/24/solid";
import Dropzone from "@/components/Dropzone";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import useTranslate from "@/hooks/useTranslate";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t, Trans } = useTranslate();

  return (
    <div className="flex flex-col flex-grow items-center justify-center gap-5 md:gap-20 md:py-10 bg-gradient-to-b from-slate-200 to-white">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <h1 className="font-extrabold text-3xl text-neutral-800 text-center w-auto px-6 md:w-full md:text-6xl xl:w-4/6">
          {t("index.h1")}
        </h1>
        <h2 className="font-light text-center text-sm text-neutral-600 px-8 md:text-lg md:w-5/6 md:px-16">
          <Trans i18nKey={"index.h2"}>
            You provide the guest list with fields you want.
            <br />
            We provide <span className="underline">print-ready</span>
            <span className="font-bold">QR codes</span> to deliver plus a
            <span className="underline">web-based</span>
            <span className="font-bold">QR Code scanner</span> to scan them.
          </Trans>
        </h2>
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="text-xl text-center text-neutral-600 font-bold">
          {t("index.h3")}
        </h3>
        <Dropzone />
      </section>

      <Button asChild size="lg" className=" bg-neutral-800 rounded-xl">
        <Link to="/scanner" className="flex items-center gap-1">
          <CameraIcon className="size-5 mr-2" />
          {t("index.scannerButton")}
        </Link>
      </Button>
    </div>
  );
}
