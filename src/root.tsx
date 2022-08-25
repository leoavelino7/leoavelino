import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation
} from "remix";
import type { MetaFunction } from "remix";
import css from "./styles/dist.css";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

import * as gtag from "~/lib/gtags.client";
import { fallbackLng, isSupported, Language } from "./lib/language";
import { useChangeLanguage } from "remix-i18next";

type LoaderData = {
  gaTrackingId: string | undefined;
  language: Language;
};

type Params = {
  language: Language;
};

export const loader: LoaderFunction = async (props) => {
  const params = props.params as Params;

  if (Object.keys(params).length === 0) {
    return redirect(`/${fallbackLng}/`);
  }

  if (!isSupported(params.language)) {
    throw new Response("Not Found", {
      status: 404
    });
  }

  return json<LoaderData>({ gaTrackingId: process.env.GA_TRACKING_ID, language: params.language });
};

export const meta: MetaFunction = () => {
  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1"
  };
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: css }];

export default function App() {
  const location = useLocation();
  const { gaTrackingId, language } = useLoaderData<LoaderData>();
  const { i18n, } = useTranslation();

  useEffect(() => {
    if (typeof window.gtag !== "undefined" && gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  useChangeLanguage(language);
    
  return (
    <html lang={language} dir={i18n.dir()} className="theme-light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="color-scheme" content="light" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@9.0.7/dist/ReactToastify.min.css"></link>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" || !gaTrackingId ? null : (
          <Fragment>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`} />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `
              }}
            />
          </Fragment>
        )}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>Oops! Page not found</title>
        {/* <Meta /> */}
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}
