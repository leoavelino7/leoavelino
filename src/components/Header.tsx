import { Link, useLocation, useNavigate } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import { LeoAvelinoIcon, TranslateIcon } from "~/icons";
import { AppLinks } from "~/lib/appLinks";
import { isSupported, languages } from "~/lib/language";
import type { LanguageItem } from "~/lib/language";
import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { themes, useTheme } from "~/hooks/useTheme";
import type { Theme } from "~/hooks/useTheme";
import { useFontSize } from "~/hooks/useFontSize";
import type { FontSize } from "~/hooks/useFontSize";

const getPathnameWithoutLanguage = (pathname: string) => pathname.split("/").slice(2).join("/");

type HeaderProps = {
  loading: boolean;
};

export const Header: FC<HeaderProps> = ({ loading }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useTheme();
  const [fontSize, setFontSize, fontSizeList] = useFontSize();
  const [language, setLanguage] = useState("");

  const changeLanguage = ({ value }: LanguageItem) => {
    if (isSupported(value) && value !== i18n.resolvedLanguage) {
      const pathnameWithoutLanguage = getPathnameWithoutLanguage(location.pathname);
      const to = `/${value}/${pathnameWithoutLanguage}${location.hash}${location.search}`;
      setLanguage(value);
      i18n.changeLanguage(value);
      navigate(to);
    }
  };

  useEffect(() => {
    if (!language && i18n.resolvedLanguage) setLanguage(i18n.resolvedLanguage);
  }, [i18n.resolvedLanguage, language]);

  return (
    <nav className="relative flex items-center w-full bg-paper h-28 md:h-20 header-shadow z-40">
      <div className="relative flex flex-col gap-y-4 md:flex-row justify-between items-center w-full px-4 lg:px-1 m-auto max-w-7xl">
        <header>
          <Link to={AppLinks.home(i18n.resolvedLanguage)} className="flex w-fit focus:outline-none focus:opacity-60">
            <LeoAvelinoIcon />
          </Link>
        </header>
        <div className="flex flex-row gap-4">
          <Dropdown<LanguageItem>
            id="language-dropdown"
            label={
              <Fragment>
                <TranslateIcon />
                {loading ? <Skeleton width="60px" /> : t("header_languages")}
              </Fragment>
            }
            list={languages}
            change={changeLanguage}
            itemActive={language ?? i18n.resolvedLanguage}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<Theme>
            id="theme-dropdown"
            label={loading ? <Skeleton width="60px" /> : t("header_themes")}
            list={themes}
            change={(theme) => setTheme(theme.value)}
            itemActive={theme}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<FontSize>
            id="font-size-dropdown"
            label={loading ? <Skeleton width="60px" /> : t("header_font_size")}
            list={fontSizeList}
            change={(fontSize) => setFontSize(fontSize.value)}
            itemActive={fontSize}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />
        </div>
      </div>
    </nav>
  );
};
