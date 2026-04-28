import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as RNLocalize from "react-native-localize";
import { translations, TranslationKey } from "./translations";

const LANGUAGE_STORAGE_KEY = "app_language";
const supportedLanguages = ["en", "hi"] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

type I18nContextValue = {
    language: AppLanguage;
    isI18nReady: boolean;
    setLanguage: (language: AppLanguage) => Promise<void>;
    t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const isSupportedLanguage = (value: string): value is AppLanguage => {
    return supportedLanguages.includes(value as AppLanguage);
};

const getDeviceLanguage = (): AppLanguage => {
    const locale = RNLocalize.getLocales()[0]?.languageCode?.toLowerCase();
    return locale && isSupportedLanguage(locale) ? locale : "en";
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguageState] = useState<AppLanguage>("en");
    const [isI18nReady, setIsI18nReady] = useState(false);

    useEffect(() => {
        const bootstrapLanguage = async () => {
            try {
                const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
                if (savedLanguage && isSupportedLanguage(savedLanguage)) {
                    setLanguageState(savedLanguage);
                } else {
                    setLanguageState(getDeviceLanguage());
                }
            } finally {
                setIsI18nReady(true);
            }
        };

        bootstrapLanguage().catch(() => {
            setLanguageState(getDeviceLanguage());
            setIsI18nReady(true);
        });
    }, []);

    const setLanguage = async (nextLanguage: AppLanguage) => {
        setLanguageState(nextLanguage);
        await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    };

    const value = useMemo<I18nContextValue>(() => {
        return {
            language,
            isI18nReady,
            setLanguage,
            t: (key) => translations[language][key] ?? translations.en[key],
        };
    }, [language, isI18nReady]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
    const context = useContext(I18nContext);

    if (!context) {
        throw new Error("useI18n must be used within LanguageProvider");
    }

    return context;
};
