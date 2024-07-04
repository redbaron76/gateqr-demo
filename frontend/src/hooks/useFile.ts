import React from "react";
import { api } from "@/lib/client";
import { getErrorMessage } from "@/lib/utils";
import { saveAs } from "file-saver";

export default function useFile() {
  const handleSampleDownload = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await api.download.$get();

      if (!response.ok) throw new Error("Error downloading sample file!");

      response.blob().then((blob) => {
        saveAs(blob, "sample.csv");
      });
    } catch (error) {
      alert(getErrorMessage(error));
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
