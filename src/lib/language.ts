export enum Language {
  PT_BR = "pt-BR",
  EN = "en"
}

export type LanguageItem = {
  children: string;
  value: Language;
};

export const supportedLanguages = [Language.PT_BR, Language.EN];

export const languages: LanguageItem[] = [
  { children: "English", value: Language.EN },
  { children: "Português (Brasil)", value: Language.PT_BR }
];

export const defaultLanguage = Language.EN;

export const isSupported = (language: Language) => supportedLanguages.includes(language);

export const localePath = "/locales/{{lng}}/{{ns}}.json";
