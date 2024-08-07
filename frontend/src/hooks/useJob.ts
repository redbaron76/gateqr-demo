import React from "react";
import { log } from "@/lib/utils";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";
import useTranslate from "@/hooks/useTranslate";

export type JobResponse = {
  state: JobStatus;
  jobId: number;
};

export type JobMonitorResponse = {
  state: JobStatus;
  progress: number;
  base64Data: string;
};

type JobStatus =
  | "completed"
  | "waiting"
  | "active"
  | "delayed"
  | "failed"
  | "paused";

export default function useJob() {
  const [progress, setProgress] = React.useState(0);
  const [jobId, setJobId] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState<JobStatus>("waiting");

  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const [buttonLabel, setButtonLabel] = React.useState<string>("Upload file");
  const [error, setError] = React.useState<string>("");

  const fileRef = React.useRef<string>("");

  const { t } = useTranslate();

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles) setFile(acceptedFiles[0]);
      if (error) setError("");
    },
    [error]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const base64ToBlob = (base64: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "application/zip" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // set file
    if (files) setFile(files[0]);
    // reset error if any
    if (error) setError("");
  };

  const handleCancel = () => {
    setFile(null);
    setError("");
    setLoading(false);
    setProgress(0);
    setJobId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    if (!file) {
      return alert(t("useJob.noFileSelected"));
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      fileRef.current = "";

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        handleCancel();
        return setError(data.message);
      }

      const { state, jobId }: JobResponse = await response.json();
      setJobId(jobId);
      setStatus(state);

      await monitorJob(jobId);
    } catch (error) {
      log("Error uploading file:", error);
      return alert(t("useJob.errorUploadingFile"));
    }
  };

  const monitorJob = async (id: number) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/upload/job/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          clearInterval(interval);
          handleCancel();
          const data = await response.json();
          return setError(data.message);
        }

        const data = await response.json();
        setStatus(data.state);
        setProgress(data.progress);

        // if (data.state === "active") await monitorJob(id);

        if (data.state === "completed" && data.base64Data) {
          clearInterval(interval);
          handleCancel();

          if (!fileRef.current) {
            const blob = base64ToBlob(data.base64Data);
            fileRef.current = `GATE_QR_${new Date().getTime()}.zip`;
            return saveAs(blob, fileRef.current);
          }
        }
      } catch (error) {
        clearInterval(interval);
        console.error("Error monitoring job:", error);
      }
    }, 1000);
  };

  React.useEffect(() => {
    setButtonLabel(() => {
      switch (true) {
        case loading && progress < 100:
          return t("useJob.generatingCodes", { progress });
        case progress === 100 && status === "active":
          return t("useJob.packingFile");
        default:
          return t("useJob.uploadFile");
      }
    });
  }, [t, loading, status, progress]);

  return {
    file,

    jobId,
    error,
    status,
    loading,
    progress,
    buttonLabel,
    isDragActive,
    hasFileSelected: !!file,

    handleSubmit,
    handleCancel,
    handleFileChange,
    getRootProps,
    getInputProps,
  };
}
