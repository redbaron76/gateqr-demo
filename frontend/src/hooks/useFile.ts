import React from "react";
import { saveAs } from "file-saver";
import { useDropzone } from "react-dropzone";

export function useFile() {
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    // console.log("Files dropped:", acceptedFiles);
    if (acceptedFiles) setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setFile(files[0]);
  };

  const handleCancel = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      }

      response.blob().then((blob) => {
        saveAs(blob, `Gate_QR_${new Date().getTime()}.zip`);
        setLoading(false);
        setFile(null);
      });
    } catch (error) {
      console.log("Error uploading file:", error);
      alert("Error uploading file!");
    }
  };

  const handleSampleDownload = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/download", {
        method: "GET",
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      }

      response.blob().then((blob) => {
        saveAs(blob, "sample.csv");
      });
    } catch (error) {
      console.error("Error downloading sample file:", error);
      alert("Error downloading sample file!");
    }
  };

  // function convert bytes to human readable format
  const bytesToSize = (bytes: number) => {
    const sizes = ["Bytes", "Kb", "Mb", "Gb", "Tb"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  return {
    file,
    loading,
    hasFileSelected: !!file,
    isDragActive,
    handleSampleDownload,
    getRootProps,
    getInputProps,
    handleFileChange,
    handleSubmit,
    handleCancel,
    bytesToSize,
  };
}
