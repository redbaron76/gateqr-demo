import { createJSONStorage, persist } from "zustand/middleware";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Provider = "gateqr";
export type ScanBackground =
  | "bg-black"
  | "bg-green-500"
  | "bg-red-500"
  | "bg-amber-500";

export type Guest = {
  provider: Provider;
} & Record<string, string>;

export type GuestProps = {
  bg: ScanBackground;
  guests: Guest[];
  currentGuest: Guest;
  timeOut?: Timer;
  isPausing: boolean;
};

interface GuestStore extends GuestProps {
  checkQrData: (data: string, cb: () => Promise<void>, timeOut: number) => void;
  decodeBase64: (base64: string) => Guest;
  resumeScanner: (cb: () => Promise<void>, timeOut: number) => void;
  toggleScanner: (cb: () => Promise<void>, timeOut: number) => void;
  resetScannerState: () => void;
  setGuest: (key: keyof GuestProps, value: GuestProps[typeof key]) => void;
}

export const useGuestStore = create<GuestStore>()(
  persist(
    immer((set, get) => ({
      bg: "bg-black",
      guests: [],
      currentGuest: {
        provider: "gateqr",
      },
      isPausing: false,

      checkQrData: (data, cb, to = 2000) => {
        let runFinally: boolean = true;

        const { bg, guests, decodeBase64, resumeScanner } = get();

        try {
          // prevent fast double execution
          if (bg !== "bg-black") {
            runFinally = false;
            return;
          }

          const guest = decodeBase64(data);
          if (guest.provider !== "gateqr") {
            throw new Error(
              `Invalid QR code: ${JSON.stringify(guest, null, 2)}`
            );
          }

          // check guest object with all the same properties not already in guests list
          const guestPresent = guests.some((g) =>
            Object.keys(g).every((k) => g[k] === guest[k])
          );

          set((state) => {
            state.bg = guestPresent ? "bg-amber-500" : "bg-green-500";
            state.currentGuest = guest;
            if (!guestPresent) state.guests.push(guest);
          });
        } catch (error) {
          console.log("checkQrData ERROR:", error);
          set((state) => {
            state.bg = "bg-red-500";
            state.currentGuest = { provider: "gateqr" };
          });
        } finally {
          if (runFinally) resumeScanner(cb, to);
        }
      },

      decodeBase64: (base64) => {
        return JSON.parse(atob(base64.toString()));
      },

      resumeScanner: (cb, to) => {
        const timeOut = setTimeout(async () => {
          await cb();
          set((state) => {
            state.bg = "bg-black";
            state.currentGuest = { provider: "gateqr" };
          });
        }, to);
        set({ timeOut });
      },

      toggleScanner: (cb, to) => {
        const { bg, timeOut, resumeScanner } = get();
        if (timeOut && bg !== "bg-black") {
          clearTimeout(timeOut);
          set({ timeOut: undefined, isPausing: true });
        }

        if (!timeOut && bg !== "bg-black") {
          set({ bg: "bg-black", isPausing: false });
          resumeScanner(cb, to);
        }
      },

      resetScannerState: () => {
        set({
          bg: "bg-black",
          isPausing: false,
          timeOut: undefined,
          currentGuest: { provider: "gateqr" },
        });
      },

      setGuest: (key, value) => {
        const state = get();
        set({
          ...state,
          [key]: value,
        });
      },
    })),
    {
      name: "guest-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guests: state.guests,
        // currentGuest: state.currentGuest,
      }),
    }
  )
);
