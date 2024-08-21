import { Button } from "@/components/ui/button";
import { CameraIcon } from "@heroicons/react/24/solid";
import Dropzone from "@/components/Dropzone";
import { Link } from "@tanstack/react-router";
import Locale from "@/components/Locale";
import { createFileRoute } from "@tanstack/react-router";
import useTranslate from "@/hooks/useTranslate";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { t } = useTranslate();

  return (
    <div className="flex flex-col flex-grow items-center justify-center bg-gradient-to-b from-slate-200 to-white">
      <div className="container flex flex-col flex-grow items-center justify-center gap-5 md:gap-20 md:py-14">
        <div className="flex flex-col items-center gap-6 md:gap-12">
          <Locale
            as="h1"
            className="font-extrabold px-0 lg:px-24 xl:px-32 text-xl md:text-5xl xl:text-6xl text-neutral-800 text-center"
          >
            {t("index.h1")}
          </Locale>
          <Locale
            as="h2"
            className="font-light px-0 md:px-14 lg:px-48 xl:px-64 text-center text-sm md:text-2xl text-neutral-600"
          >
            {t("index.h2")}
          </Locale>
        </div>

        <section className="flex flex-col gap-4">
          <Locale
            as="h3"
            className="text-base sm:text-xl md:text-2xl text-center text-neutral-800 font-bold"
          >
            {t("index.h3")}
          </Locale>
          <Dropzone />
        </section>

        <Button
          asChild
          size="lg"
          className="bg-neutral-800 rounded-xl md:p-8 md:text-xl"
        >
          <Link to="/scanner" className="flex items-center gap-1">
            <CameraIcon className="size-5 md:size-8 mr-2" />
            {t("index.scannerButton")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
