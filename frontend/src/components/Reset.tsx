import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useGuestStore } from "@/stores/useGuestStore";

const Reset: React.FC = () => {
  const { bg, counter, scanner, setGuest } = useGuestStore((store) => ({
    bg: store.bg,
    counter: store.guests.length,
    scanner: store.scanner,
    setGuest: store.setGuest,
  }));

  if (!scanner || counter === 0 || bg !== "bg-black") return null;

  const resetGuestList = () => setGuest("guests", []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="absolute top-6 left-5 text-white">
          <TrashIcon className="size-8" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Would you like to reset all the guest list?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={resetGuestList}
            className="bg-red-600 font-bold"
          >
            Yes, proceed!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Reset;
