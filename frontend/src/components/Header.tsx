import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Language from "@/components/Language";
import { Link } from "@tanstack/react-router";
import React from "react";
import useTranslate from "@/hooks/useTranslate";

type LanguageItem = {
  link: string;
  label: string;
  className: string;
};

type MenuProps = {
  items: LanguageItem[];
  onClick?: () => void;
};

const MenuItems: React.FC<MenuProps> = ({ items, onClick }) => {
  const { t } = useTranslate();

  return items.map((item, index) => (
    <Link
      key={`item-${index}`}
      to={item.link}
      className={item.className}
      onClick={onClick}
      // data-active="bg-gray-100/50"
    >
      {t(item.label)}
    </Link>
  ));
};

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="container mx-auto flex h-14 w-full shrink-0 items-center px-4 gap-4 md:px-6">
      <div className="flex-1">
        <Link to="/">
          <img
            src="/logo.svg"
            alt="GATE:QR"
            width={96}
            height={26}
            className="w-24 h-auto"
          />
        </Link>
      </div>
      <nav className="ml-auto hidden md:flex gap-6">
        <MenuItems
          items={[
            {
              link: "/",
              label: "root.generator",
              className:
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
            },
            {
              link: "/scanner",
              label: "root.scanner",
              className:
                "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50",
            },
          ]}
        />
      </nav>
      <Language />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            <Bars3Icon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle>
            <img
              src="/logo.svg"
              alt="GATE:QR"
              width={96}
              height={26}
              className="w-24 h-auto"
            />
          </SheetTitle>
          <SheetDescription></SheetDescription>
          <div className="grid gap-2 py-6">
            <MenuItems
              items={[
                {
                  link: "/",
                  label: "root.generator",
                  className:
                    "flex w-full items-center py-2 text-lg font-semibold",
                },
                {
                  link: "/scanner",
                  label: "root.scanner",
                  className:
                    "flex w-full items-center py-2 text-lg font-semibold",
                },
              ]}
              onClick={() => setOpen(!open)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
