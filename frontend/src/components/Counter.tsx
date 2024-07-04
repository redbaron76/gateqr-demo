import { CloudArrowDownIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import React from "react";
import { tsToDate } from "@/lib/utils";
import useCounter from "@/hooks/useCounter";
import useTranslate from "@/hooks/useTranslate";

const Counter: React.FC = () => {
  const {
    open,
    guests,
    scanner,
    getEntries,
    getHeaderEntries,
    handleOpen,
    handleDownloadLiist,
  } = useCounter();

  const { t } = useTranslate();

  if (!scanner) return null;

  return (
    <Drawer open={open} onOpenChange={handleOpen}>
      <DrawerTrigger asChild>
        <button className="absolute bottom-5 right-5 border-2 border-white rounded-2xl px-2 min-w-14 min-h-14 flex justify-center items-center gap-1">
          <UserIcon className="size-5 text-white" />
          <span className="text-white text-xl font-bold">{guests.length}</span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85dvh]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-neutral-600">
            {t("Counter.title")}
          </DrawerTitle>
          <DrawerDescription>{t("Counter.description")}</DrawerDescription>
        </DrawerHeader>

        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              {getHeaderEntries().map((entry, i) => (
                <TableHead key={`header-${i}`} className="whitespace-nowrap">
                  {entry}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.map((guest, i) => (
              <TableRow key={`guest-${i}`}>
                {getEntries(guest).map(([key, value], i) => {
                  if (key === "_checkTime") value = tsToDate(value);
                  return (
                    <TableCell
                      key={`${key}-${i}`}
                      className="whitespace-nowrap"
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DrawerFooter className="pt-2">
          <Button
            size="lg"
            className="bg-blue-500"
            onClick={handleDownloadLiist}
          >
            <CloudArrowDownIcon className="size-5 text-white mr-2" />
            {t("Counter.downloadList")}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">{t("label.cancel")}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Counter;
