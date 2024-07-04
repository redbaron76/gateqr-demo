import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";
import useFile from "@/hooks/useFile";
import useJob from "@/hooks/useJob";
import useTranslate from "@/hooks/useTranslate";

// import useFile from "@/hooks/useFile";

const Dropzone = () => {
  const { handleSampleDownload, bytesToSize } = useFile();

  const {
    handleCancel,
    handleSubmit,
    getInputProps,
    getRootProps,
    hasFileSelected,
    isDragActive,
    buttonLabel,
    loading,
    error,
    file,
  } = useJob();

  const { t, Trans } = useTranslate();

  const errorWrapper = error
    ? "border-red-800 bg-red-200"
    : "border-neutral-600 bg-neutral-300";

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div
        {...getRootProps()}
        className={`flex flex-col justify-center items-center w-80 h-40 border-4 border-dashed  p-4 rounded-xl gap-2 ${errorWrapper}`}
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon
          className={`size-16 ${error ? "text-red-800" : hasFileSelected ? "text-blue-600" : "text-neutral-600"}  ${loading ? "animate-pulse" : ""}`}
        />
        <p className="text-base text-center text-neutral-600">
          {error ? (
            <span className="text-red-800">
              {t(`server.uploadSchema.${error}`)}
            </span>
          ) : hasFileSelected ? (
            <span className="flex flex-col">
              <span>
                {t("Dropzone.selectFile")}: <strong>{file?.name}</strong>
              </span>
              <span className="text-[10px]">[{bytesToSize(file!.size)}]</span>
            </span>
          ) : isDragActive ? (
            <span>
              <Trans i18nKey="Dropzone.onDrop">
                Drop your <strong>*.csv</strong> file here...
              </Trans>
            </span>
          ) : (
            <span>
              <Trans i18nKey="Dropzone.drop">
                Drop a <strong>*.csv</strong> file here
                <br /> or <strong>click</strong> to select it from disk.
              </Trans>
            </span>
          )}
        </p>
      </div>
      {hasFileSelected ? (
        <div className="flex flex-col gap-1">
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600"
          >
            {loading && (
              <ArrowPathIcon className="size-4 mr-1 text-neutral-300 animate-spin" />
            )}
            {buttonLabel}
          </Button>
          {!loading && (
            <Button variant="link" className="text-xs" onClick={handleCancel}>
              {t("label.cancel")}
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          <h3 className="text-sm font-bold">{t("Dropzone.howToFormat")}</h3>
          <a
            href="#"
            title="Get a *.csv sample file"
            className="text-xs text-neutral-500"
            onClick={(e) => handleSampleDownload(e)}
          >
            {t("Dropzone.getSample")}
          </a>
        </div>
      )}
    </form>
  );
};

export default Dropzone;
