import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languages from "@/i18n/languages";

// Configura i18next
i18n
  .use(Backend) // Carica i file di traduzione
  .use(LanguageDetector) // Rileva automaticamente la lingua del browser
  .use(initReactI18next) // Inizializza i18next con react-i18next
  .init({
    fallbackLng: "en", // Lingua di default se quella rilevata non è disponibile
    debug: false, // Attiva la modalità debug per vedere i log di i18next
    interpolation: {
      escapeValue: false, // React già di per sé protegge dagli XSS
    },
    supportedLngs: Object.keys(languages), // Lingue supportate
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Percorso dei file di traduzione
    },
  });

export default i18n;
