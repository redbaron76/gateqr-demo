import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";
import { useFile } from "@/hooks/useFile";

const Dropzone = () => {
  const {
    handleCancel,
    handleSubmit,
    getInputProps,
    getRootProps,
    bytesToSize,
    hasFileSelected,
    isDragActive,
    loading,
    file,
  } = useFile();

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center w-80 h-40 border-4 border-dashed border-neutral-600 p-4 rounded-xl bg-neutral-300 gap-2"
      >
        <input {...getInputProps()} />
        <CloudArrowUpIcon
          className={`size-16 text-neutral-600 ${loading ? "animate-pulse" : ""}`}
        />
        <p className="text-base text-center text-neutral-600">
          {hasFileSelected ? (
            <span className="flex flex-col">
              <span>
                Hai selezionato: <strong>{file?.name}</strong>
              </span>
              <span className="text-[10px]">[{bytesToSize(file!.size)}]</span>
            </span>
          ) : isDragActive ? (
            <span>
              Rilascia il file <strong>*.csv</strong> qui...
            </span>
          ) : (
            <span>
              Rilascia un file <strong>*.csv</strong> qui
              <br /> o <strong>clicca</strong> per selezionarne uno
            </span>
          )}
        </p>
      </div>
      {hasFileSelected && (
        <div className="flex flex-col gap-1">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-600"
          >
            {loading && (
              <ArrowPathIcon className="size-4 mr-1 text-neutral-300 animate-spin" />
            )}
            {loading ? "Generazione codici..." : "Carica file"}
          </Button>
          {!loading && (
            <Button variant="link" className="text-xs" onClick={handleCancel}>
              Annulla
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default Dropzone;
