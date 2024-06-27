import { ArrowPathIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";
import { useFile } from "@/hooks/useFile";

const Dropzone = () => {
  const {
    handleSampleDownload,
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
          className={`size-16 ${hasFileSelected ? "text-blue-600" : "text-neutral-600"}  ${loading ? "animate-pulse" : ""}`}
        />
        <p className="text-base text-center text-neutral-600">
          {hasFileSelected ? (
            <span className="flex flex-col">
              <span>
                Selected file: <strong>{file?.name}</strong>
              </span>
              <span className="text-[10px]">[{bytesToSize(file!.size)}]</span>
            </span>
          ) : isDragActive ? (
            <span>
              Drop your <strong>*.csv</strong> file here...
            </span>
          ) : (
            <span>
              Drop a <strong>*.csv</strong> file here
              <br /> or <strong>click</strong> to select it from disk.
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
            {loading ? "Generating codes..." : "Upload file"}
          </Button>
          {!loading && (
            <Button variant="link" className="text-xs" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          <h3 className="text-sm font-bold">How to create a *.csv file?</h3>
          <a
            href="#"
            title="Get a *.csv sample file"
            className="text-xs text-neutral-500"
            onClick={(e) => handleSampleDownload(e)}
          >
            Get a sample here
          </a>
        </div>
      )}
    </form>
  );
};

export default Dropzone;
