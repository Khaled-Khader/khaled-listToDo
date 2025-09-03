
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from './locales/en.json'
import ar from './locales/ar.json'
import tu from './locales/tu.json'
import ch from './locales/ch.json'
import fr from './locales/fr.json'
import jp from './locales/jp.json'
import gr from './locales/gr.json'
i18n
    .use(initReactI18next) // connect with React
    .init({
        resources: {
        en: { translation: en },
        ar: { translation: ar },
        jp: { translation: jp },
        fr: { translation: fr },
        ch: { translation: ch },
        tu: { translation: tu },
        gr: { translation: gr}
        },
        lng: "en", // default language
        fallbackLng: "en",
        interpolation: { escapeValue: false }, // React already escapes
    });