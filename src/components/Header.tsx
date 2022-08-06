import { Link, useLocation, useNavigate } from "remix";
import { useTranslation } from "react-i18next";
import FocusLock from "react-focus-lock";

import { LeoAvelinoIcon, TranslateIcon } from "~/icons";
import { AppLinks } from "~/lib/appLinks";
import { isSupported, Language, languages } from "~/lib/language";
import { FC, useEffect, useReducer, useRef, useState } from "react";

const getPathnameWithoutLanguage = (pathname: string) => pathname.split("/").slice(2).join("/");

const KeyboardEscape = "Escape";

enum KeyboardArrow {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown"
}

const keyboardArrows: string[] = [KeyboardArrow.ArrowUp, KeyboardArrow.ArrowDown];

export const Header: FC = () => {
  const { t, i18n, ready } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const [language, setLanguage] = useState(() => getPathnameWithoutLanguage(location.pathname));
  const [isOpenMenuLanguage, setIsOpenMenuLanguage] = useState(false);
  const [isFocusUnlocked, setIsFocusUnlocked] = useState(false);

  const changeLanguageButtonRef = useRef<HTMLButtonElement>(null);
  const languageListRef = useRef<HTMLUListElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === KeyboardEscape) {
      event.preventDefault();
      setIsFocusUnlocked(true);
      toggleMenuLanguage();
      return;
    }

    if (keyboardArrows.includes(event.key)) {
      event.preventDefault();
      const items = Array.from(languageListRef.current?.children ?? []) as HTMLLIElement[];
      const target = event.target as HTMLButtonElement;

      const itemPosition = Number(target.dataset["itemPosition"]);

      const currentItem = items[itemPosition];

      if (event.key === KeyboardArrow.ArrowDown && currentItem.nextSibling) {
        const nextItemButtonElement = currentItem.nextSibling.firstChild as HTMLButtonElement;
        if (nextItemButtonElement) return void nextItemButtonElement.focus();
      }

      if (currentItem.previousSibling) {
        const previousItemButtonElement = currentItem.previousSibling.firstChild as HTMLButtonElement;
        if (previousItemButtonElement) return void previousItemButtonElement.focus();
      }

      const itemsSize = items.length;

      if (itemsSize > 0) {
        const lastItem = items[itemsSize - 1].firstChild as HTMLButtonElement;
        if (lastItem) return void lastItem.focus();
      }
    }
  };

  const changeLanguage = (newLanguage: Language) => {
    if (isSupported(newLanguage) && newLanguage !== i18n.resolvedLanguage) {
      const pathnameWithoutLanguage = getPathnameWithoutLanguage(location.pathname);
      const to = `/${newLanguage}/${pathnameWithoutLanguage}${location.hash}${location.search}`;
      setLanguage(newLanguage);
      navigate(to);
      toggleMenuLanguage();
    }
  };

  const toggleMenuLanguage = () => void setIsOpenMenuLanguage((isOpen) => !isOpen);

  useEffect(() => {
    if (language) {
      changeLanguageButtonRef.current?.focus();
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    if (isOpenMenuLanguage) {
      setIsFocusUnlocked(false);
    }
  }, [isOpenMenuLanguage]);

  useEffect(() => {
    if (isFocusUnlocked) {
      changeLanguageButtonRef.current?.focus();
    }
  }, [isFocusUnlocked]);

  return (
    <nav className="relative flex items-center w-full bg-paper h-20 header-shadow z-40">
      <div className="relative flex flex-row justify-between items-center w-full px-4 lg:px-1 m-auto max-w-7xl">
        <header>
          <Link to={AppLinks.home(i18n.resolvedLanguage)} className="flex w-fit">
            <LeoAvelinoIcon />
          </Link>
        </header>
        <div className="relative z-20">
          <button ref={changeLanguageButtonRef} className="flex gap-2 text-md focus:outline-dashed" onClick={toggleMenuLanguage}>
            <TranslateIcon />
            {t("header_languages")}
          </button>
          {isOpenMenuLanguage && (
            <FocusLock disabled={isFocusUnlocked}>
              <ul
                ref={languageListRef}
                onKeyDown={onKeyDown}
                className="flex flex-col w-[200px] absolute top-10 right-0 bg-paper header-shadow rounded-md"
              >
                {languages.map((language, index) => (
                  <li key={language.lang}>
                    <button
                      data-item-position={index}
                      className={`text-left w-full px-4 py-2 hover:bg-primary-light ${
                        language.lang === i18n.resolvedLanguage ? "bg-primary-light bg-opacity-50" : ""
                      }`}
                      onClick={() => changeLanguage(language.lang)}
                    >
                      {language.title}
                    </button>
                  </li>
                ))}
              </ul>
            </FocusLock>
          )}
        </div>
      </div>
    </nav>
  );
};
