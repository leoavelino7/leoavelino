import { TFunction } from "react-i18next";

export {};

declare global {

  type ComponentI18n = {
    language?: string;
    translate: TFunction;
    loading: boolean;
  }

  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      
      APP_DOMAIN: string;

      DATABASE_URL: string;
      
      GA_TRACKING_ID: string;
    }
  }
}
