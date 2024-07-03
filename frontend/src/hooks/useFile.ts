import React from "react";
import { saveAs } from "file-saver";

export default function useFile() {
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
    handleSampleDownload,
    bytesToSize,
  };
}
