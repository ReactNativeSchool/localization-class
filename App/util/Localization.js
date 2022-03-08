import { useEffect, useState } from 'react';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

const readableTranslations = {
  currencyConverter: {
    en: 'Currency Converter',
    es: 'Convertidor de Moneda',
  },
  reverseCurrencies: {
    en: 'Reverse Currencies',
    es: 'Monedas Inversas',
  },
  baseCurrency: {
    en: 'Base Currency',
    es: 'Moneda Base',
  },
  quoteCurrency: {
    en: 'Quote Currency',
    es: 'Moneda de Cotización',
  },
};

const formatTranslations = (translations = {}) => {
  const output = {};

  Object.keys(translations).forEach((word) => {
    const wordTranslations = translations[word];
    Object.keys(wordTranslations).forEach((language) => {
      if (!output[language]) {
        output[language] = {};
      }

      output[language][word] = translations[word][language];
    });
  });

  return output;
};

export const useLocalization = () => {
  const [localizationConfigured, setLocalizationConfigured] = useState(false);

  useEffect(() => {
    i18n.translations = formatTranslations(readableTranslations);
    i18n.fallbacks = true;
    i18n.defaultLocale = 'en';

    const handleLocalizationChange = () => {
      const locale = RNLocalize.getLocales()[0].languageCode;

      i18n.locale = locale;
    };

    handleLocalizationChange();

    setLocalizationConfigured(true);

    RNLocalize.addEventListener('change', handleLocalizationChange);

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  return { localizationConfigured };
};
