import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { useRouter } from "next/router";

export enum LANGUAGE_DICT {
  "en" = "ENG",
  "jp" = "日本語",
}

export type LanguageContextType = {
  language: string;
  setLanguage?: Dispatch<SetStateAction<string>>;
  currency: string;
  setCurrency?: Dispatch<SetStateAction<string>>;
  allLocales: string[] | undefined;
  allCurrency: string[] | undefined;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  currency: "USD",
  allLocales: ["en", "jp"],
  allCurrency: ["USD", "JPY"],
});

const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { locale: activeLocale, locales: allLocales } = useRouter();
  const [language, setLanguage] = useState<string>(
    (activeLocale as string) || "en"
  );
  const [currency, setCurrency] = useState<string>("USD");
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        allLocales: ["en", "jp"],
        allCurrency: ["USD", "JPY"],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
