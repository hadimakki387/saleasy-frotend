"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { fr } from "@/locales/fr/fr";
import LanguageDetector from "i18next-browser-languagedetector";
import { ar } from "@/locales/ar/ar";
import { zhCn } from "@/locales/zh-cn/zh-cn";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      zh_CN: {
        translation: zhCn,
      },
      fr: {
        translation: fr,
      },
      ar: {
        translation: ar,
      },
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
