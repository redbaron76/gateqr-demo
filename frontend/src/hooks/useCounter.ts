import { saveAs, tsToDate } from "@/libs/utils";

import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

export default function useCounter() {
  const [open, setOpen] = React.useState(false);
  const { guests, scanner, getHeaderEntries, getEntries } = useGuestStore(
    (store) => ({
      guests: store.guests,
      scanner: store.scanner,
      getHeaderEntries: store.getHeaderEntries,
      getEntries: store.getEntries,
    })
  );

  const handleOpen = (state: boolean) => {
    if (guests.length === 0) return;
    setOpen(state);
  };

  const handleDownloadLiist = () => {
    if (guests.length === 0) return;
    const csv = guests.map((guest) => {
      return getEntries(guest)
        .map((entry) =>
          entry[0] === "_checkTime" ? tsToDate(entry[1]) : entry[1]
        )
        .join(",");
    });
    const csvString = [getHeaderEntries().join(","), ...csv].join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, "guest_list.csv");
  };

  React.useEffect(() => {
    if (scanner) {
      open ? scanner.stopScanner() : scanner.runScanner();
    }
  }, [open]);

  return {
    open,
    guests,
    scanner,
    handleOpen,
    getEntries,
    getHeaderEntries,
    handleDownloadLiist,
  };
}
