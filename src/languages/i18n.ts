import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/common.json';
import vi from './vi/common.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  resources: {
    en: {
      common: en,
    },
    vi: {
      common: vi,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18next;
