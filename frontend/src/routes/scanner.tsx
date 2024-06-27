import ScannerQr from "@/components/ScannerQr";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scanner")({
  component: Scanner,
});

function Scanner() {
  return <ScannerQr />;
}
