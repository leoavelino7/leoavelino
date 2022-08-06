export enum Language {
  PT_BR = "pt-BR",
  EN = "en"
}

export const supportedLanguages = [Language.PT_BR, Language.EN];

export const languages = [
  { title: "English", lang: Language.EN },
  { title: "Português (Brasil)", lang: Language.PT_BR }
];

export const defaultLanguage = Language.EN;

export const isSupported = (language: Language) => supportedLanguages.includes(language);

export const localePath = "/locales/{{lng}}/{{ns}}.json";
