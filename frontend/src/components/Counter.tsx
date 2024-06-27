import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { useGuestStore } from "@/stores/useGuestStore";

const Counter: React.FC = () => {
  const counter = useGuestStore((store) => store.guests.length);

  return (
    <div className="absolute bottom-5 right-5 border-2 border-white rounded-2xl px-2 min-w-14 min-h-14 flex justify-center items-center gap-1">
      <UserIcon className="size-5 text-white" />
      <span className="text-white text-xl font-bold">{counter}</span>
    </div>
  );
};

export default Counter;
