// import Backend from "i18next-fs-backend";
// import { resolve } from "node:path";
import { RemixI18Next } from "remix-i18next";
import { fallbackLng, supportedLngs } from "./lib/language";
// import { defaultLanguage, localePath, supportedLanguages } from "./lib/language";

import enHome from "../public/locales/en/home.json";
import ptBRHome from "../public/locales/pt-BR/home.json";

const en = {
  home: enHome
};

const ptBR = {
  home: ptBRHome
};

export let i18n = new RemixI18Next({
  detection: {
    // This is the list of languages your application supports
    supportedLanguages: supportedLngs,
    // This is the language you want to use in case the user language is not
    // listed above
    fallbackLanguage: fallbackLng
  },
  // This is the configuration for i18next used when translating messages server
  // side only
  i18next: {
    // backend: { loadPath: resolve(`./public/${localePath}`) },
    resources: {
      en,
      "pt-BR": ptBR
      // }
    }
  }
  // The backend you want to use to load the translations
  // Tip: You could pass `resources` to the `i18next` configuration and avoid
  // a backend here
  // backend: Backend
});
