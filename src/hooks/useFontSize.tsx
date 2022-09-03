import { useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type FontSizeClassName = "text-xs" | "text-sm" | "text-md" | "text-lg" | "text-xl";

export type FontSize = { children: JSX.Element | string; value: FontSizeClassName };

export const fontSizeList: FontSize[] = [
  {
    children: "Extra small",
    value: "text-xs"
  },
  {
    children: "Small",
    value: "text-sm"
  },
  {
    children: "Default",
    value: "text-md"
  },
  {
    children: "Large",
    value: "text-lg"
  },
  {
    children: "Extra Large",
    value: "text-xl"
  }
];

const fontSizeValue: FontSizeClassName[] = fontSizeList.map((theme) => theme.value);

const isSupportedFontSize = (fontSize: string) => fontSizeValue.includes(fontSize as FontSizeClassName);

export const useFontSize = (): [string, (fontSize: string) => void] => {
  const [fontSize, setFontSize] = useLocalStorage("@fontSize", "text-md");
  const lastFontSizeRef = useRef(fontSize);

  const changeFontSize = (selectedFontSize: string) => {
    if (isSupportedFontSize(selectedFontSize) && selectedFontSize !== fontSize) {
      setFontSize(selectedFontSize);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { classList } = window.document.documentElement;
      classList.remove(lastFontSizeRef.current);
      classList.add(fontSize);
      lastFontSizeRef.current = fontSize;
    }
  }, [fontSize]);

  return [fontSize, changeFontSize];
};
