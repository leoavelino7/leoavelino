export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_URL: string;
      
      APP_DOMAIN: string;

      DATABASE_URL: string;
      
      GA_TRACKING_ID: string;
    }
  }
}
