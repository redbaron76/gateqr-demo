import ScannerQr from "@/components/ScannerQr";
import { metaTitle } from "@/libs/meta";
import useIsClient from "@/hooks/useIsClient";

export const meta = metaTitle;

export default function Scanner() {
  const isClient = useIsClient();

  return isClient ? <ScannerQr /> : null;
}
