import { Trans, useTranslation } from "react-i18next";

type Opt = {
  ns?: Parameters<typeof useTranslation>[0];
  options?: Parameters<typeof useTranslation>[1];
};

export default function useTranslate(ns?: Opt["ns"], options?: Opt["options"]) {
  const { t, i18n } = useTranslation(ns, options);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return {
    t,
    lang: i18n.language,
    changeLanguage,
    Trans,
  };
}
