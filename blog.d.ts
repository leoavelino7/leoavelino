export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      
      GA_TRACKING_ID: string;
    }
  }
}
