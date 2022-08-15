import { Link, useLocation, useNavigate } from "remix";
import { useTranslation } from "react-i18next";

import { LeoAvelinoIcon, TranslateIcon } from "~/icons";
import { AppLinks } from "~/lib/appLinks";
import { isSupported, languages, LanguageItem } from "~/lib/language";
import { FC, Fragment, useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { Theme, themes, useTheme } from "~/hooks/useTheme";
import { FontSize, fontSizeList, useFontSize } from "~/hooks/useFontSize";

const getPathnameWithoutLanguage = (pathname: string) => pathname.split("/").slice(2).join("/");

export const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useTheme();
  const [fontSize, setFontSize] = useFontSize();
  const [language, setLanguage] = useState(() => getPathnameWithoutLanguage(location.pathname));

  const changeLanguage = ({ value }: LanguageItem) => {
    if (isSupported(value) && value !== i18n.resolvedLanguage) {
      const pathnameWithoutLanguage = getPathnameWithoutLanguage(location.pathname);
      const to = `/${value}/${pathnameWithoutLanguage}${location.hash}${location.search}`;
      setLanguage(value);
      navigate(to);
    }
  };

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <nav className="relative flex items-center w-full bg-paper h-20 header-shadow z-40">
      <div className="relative flex flex-row justify-between items-center w-full px-4 lg:px-1 m-auto max-w-7xl">
        <header>
          <Link to={AppLinks.home(i18n.resolvedLanguage)} className="flex w-fit">
            <LeoAvelinoIcon />
          </Link>
        </header>
        <div className="flex flex-row gap-4">
          <Dropdown<LanguageItem>
            label={
              <Fragment>
                <TranslateIcon />
                {t("header_languages")}
              </Fragment>
            }
            list={languages}
            change={changeLanguage}
            itemActive={language}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<Theme>
            label={t("header_themes")}
            list={themes}
            change={(theme) => setTheme(theme.value)}
            itemActive={theme}
            itemClassName="text-left w-full px-4 py-2 hover:bg-primary-light"
          />

          <Dropdown<FontSize>
            label={t("header_font_size")}
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
