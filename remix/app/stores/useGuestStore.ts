import { createJSONStorage, persist } from "zustand/middleware";

import ScannerQR from "@/libs/scannerqr";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { log } from "@/libs/utils";

export type Provider = "gateqr";
export type ScanBackground =
  | "bg-black"
  | "bg-green-500"
  | "bg-red-500"
  | "bg-amber-500";

export type Guest = {
  _id: string;
  _provider: Provider;
  _checkTime?: string;
} & Record<string, string>;

export type GuestProps = {
  bg: ScanBackground;
  guests: Guest[];
  currentGuest: Guest;
  timeOut?: Timer;
  isPausing: boolean;
  isScanning: boolean;
  scanner?: ScannerQR;
  sound: boolean;
};

interface GuestStore extends GuestProps {
  checkQrData: (data: string, timeOut: number) => void;
  decodeBase64: (base64: string) => Guest;
  resumeScanner: (timeOut: number) => void;
  tapScanner: () => void;
  toggleScanner: (state: boolean) => void;
  resetScannerState: () => void;
  getHeaderEntries: () => string[];
  getEntries: (guest: Guest) => [string, string][];
  setGuest: (key: keyof GuestProps, value: GuestProps[typeof key]) => void;
}

const defaultGuest: Guest = {
  _id: "",
  _provider: "gateqr",
};

export const useGuestStore = create<GuestStore>()(
  persist(
    immer((set, get) => ({
      bg: "bg-black",
      guests: [],
      currentGuest: defaultGuest,
      isPausing: false,
      isScanning: false,
      sound: false,

      checkQrData: (data, to = 2000) => {
        let runFinally: boolean = true;

        const { bg, guests, scanner, decodeBase64, resumeScanner } = get();

        try {
          // prevent fast double execution
          if (bg !== "bg-black") {
            runFinally = false;
            return;
          }

          const guest = decodeBase64(data);
          if (guest._provider !== "gateqr") {
            throw new Error(
              `Invalid QR code: ${JSON.stringify(guest, null, 2)}`
            );
          }

          scanner?.stopScanner();

          // check guest object with all the same properties not already in guests list
          const guestPresent = guests.find((g) =>
            // Object.keys(g).every((k) => g[k] === guest[k])
            Object.keys(g)
              .filter((k) => k !== "_checkTime")
              .every((k) => g[k] === guest[k])
          );

          // add new _checkTime to guest object or retrieve first one
          guest._checkTime = guestPresent
            ? guestPresent._checkTime
            : new Date().getTime().toString();

          // play beep sound
          scanner?.beep();

          set((state) => {
            state.bg = guestPresent ? "bg-amber-500" : "bg-green-500";
            state.currentGuest = guest;
            if (!guestPresent) state.guests.push(guest);
          });
        } catch (error) {
          log("checkQrData ERROR:", error);
          set((state) => {
            state.bg = "bg-red-500";
            state.currentGuest = defaultGuest;
          });

          // play wrong sound
          scanner?.wrong();
        } finally {
          if (runFinally) resumeScanner(to);
        }
      },

      decodeBase64: (base64) => {
        return JSON.parse(atob(base64.toString()));
      },

      resumeScanner: (to) => {
        const { scanner } = get();
        const timeOut = setTimeout(async () => {
          set((state) => {
            state.bg = "bg-black";
            state.currentGuest = defaultGuest;
          });
          scanner?.runScanner();
        }, to);
        set({ timeOut });
      },

      tapScanner: () => {
        const { bg, timeOut, isScanning, scanner, resumeScanner } = get();

        // pause scanner
        if (timeOut && bg !== "bg-black") {
          clearTimeout(timeOut);
          set({ timeOut: undefined, isPausing: true });
        }

        // resume from pause
        if (!timeOut && bg !== "bg-black") {
          set({ bg: "bg-black", isPausing: false });
          resumeScanner(0);
        }

        // run scanner first time (first tap)
        if (!isScanning && bg === "bg-black") {
          scanner?.runScanner();
        }
      },

      toggleScanner: (state) => {
        const { scanner } = get();
        state ? scanner?.stopScanner() : scanner?.runScanner();
      },

      resetScannerState: () => {
        set({
          bg: "bg-black",
          isPausing: false,
          timeOut: undefined,
          scanner: undefined,
          currentGuest: defaultGuest,
        });
      },

      getHeaderEntries: () => {
        const { guests } = get();
        if (guests.length === 0) return [];
        const entries = Object.keys(guests[0]).filter(
          (key) => key !== "_provider" && key !== "_id" && key !== "_checkTime"
        );

        // add empty string to the first element
        entries.unshift("Check time");

        return entries;
      },

      getEntries: (guest) => {
        const entries = Object.entries(guest).filter(
          ([key]) => key !== "_provider" && key !== "_id"
        );

        // move last element to the first
        const last = entries.pop();
        if (last) entries.unshift(last);

        return entries;
      },

      setGuest: (key, value) => {
        set({ [key]: value });
      },
    })),
    {
      name: "guest-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guests: state.guests,
        sound: state.sound,
        // currentGuest: state.currentGuest,
      }),
    }
  )
);
