import * as availableLocales from "@/locales";

type i18LocalesOptions = {
  defaultLocale?: string;
  langPlaceholder?: string;
};

type Locale = {
  [key: string]: string | Locale;
};

class i18SSR {
  // Defaults
  defaultLocale: string = "en";
  currentLocale: string = this.defaultLocale;

  localePlaceholder: string = "%s";
  isSSR: boolean = typeof window === "undefined";

  locales: Map<string, Locale> = new Map<string, Locale>();
  localeNames: Map<string, string> = new Map<string, string>();
  localeFile: Locale | undefined = undefined;

  isInitialLocale: string = this.defaultLocale;

  constructor(options: i18LocalesOptions) {
    this.currentLocale = options.defaultLocale ?? this.defaultLocale;
    this.localePlaceholder = options.langPlaceholder ?? this.localePlaceholder;

    this.locales = new Map<string, Locale>();

    // load locales
    this.loadLocales().then(() => {
      // then set the current locale
      this.setLocale(this.currentLocale, "constructor");
    });
  }

  loadLocales = async () => {
    // load all available locales
    for (const localeKey of Object.keys(availableLocales)) {
      // get the module for the locale by localeKey
      const langModule = (availableLocales as Record<string, Locale>)[
        localeKey
      ];
      // set the locale name in map (es. en: "English")
      this.localeNames.set(
        localeKey,
        (langModule[localeKey] as string) || localeKey
      );
      // set the locale in the locales map
      this.locales.set(localeKey, langModule);
    }
  };

  getLocales = () => {
    return Array.from(this.localeNames.entries())
      .sort()
      .map(([key, name]) => ({ key, name }));
  };

  getLocaleName = (locale: string) => {
    return this.localeNames.get(locale) ?? locale;
  };

  // get nested value from dot notation string "about.title"
  getNestedValue(obj: Locale, path: string): string {
    // not a nested path -> return the value (or the path itself if not found)
    if (!path.includes(".")) return (obj[path] as string) ?? path;

    // split the path into keys
    const keys = path.split(".");
    let current: string | Locale = obj;

    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return path;
      }
    }

    return current as string;
  }

  setLocale = (locale: string, where?: string) => {
    this.currentLocale = locale;
    this.localeFile = this.locales.get(locale);
    where && console.log("setLocale", locale, where);
  };

  setDefaultLocale = () => {
    this.setLocale(this.defaultLocale, "setDefaultLocale");
  };

  setInitialLocale = (initialLocale?: string) => {
    switch (true) {
      // if initialLocale is set and different from the previous initial locale
      case initialLocale && this.isInitialLocale !== initialLocale:
        this.isInitialLocale = initialLocale;
        return this.setLocale(initialLocale, "setInitialLocale");
      // if not initialLocale is set and is server-side rendering
      case this.isSSR:
        return this.setDefaultLocale();
    }
  };

  substPlaceholders = (sentence: string, ...subs: (string | number)[]) => {
    /* return sentence.replace(
      new RegExp(this.localePlaceholder, "g"),
      (match) => subs.map((s) => s.toString()).shift() ?? match
    ); */

    let str = sentence;
    const ph = this.localePlaceholder;

    if (subs.length && str.indexOf(ph) > -1) {
      subs.forEach((word) => {
        str = str.replace(ph, word.toString());
      });
    }

    return str;
  };

  translate = (key: string, ...subs: (string | number)[]) => {
    // if the key is not found return the key
    if (!this.localeFile) return key;

    // console.log("translate", key, this.currentLocale);

    // get the value from the locale file
    const value = this.getNestedValue(this.localeFile, key);

    // if the value is not a string return the key
    if (typeof value !== "string") return key;

    return this.substPlaceholders(value, ...subs);
  };

  // t as alias of translate
  t = this.translate;
}

const i18ssr = new i18SSR({
  defaultLocale: "en",
});

export default i18ssr;
