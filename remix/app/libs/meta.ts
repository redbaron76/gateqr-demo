import { type MetaFunction } from "@remix-run/react";
import i18ssr from "@/libs/i18ssr";

export const metaTitle: MetaFunction = () => {
  return [
    {
      title: i18ssr.t("head.title"),
    },
    {
      name: "description",
      content: i18ssr.t("head.description"),
    },
  ];
};
