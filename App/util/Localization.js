import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import { useEffect, useState } from 'react';

export const useLocalization = () => {
  const [localizationConfigured, setLocalizationConfigured] = useState(false);

  useEffect(() => {
    i18n.translations = {
      en: {
        currencyConverter: 'Currency Converter',
        reverseCurrencies: 'Reverse Currencies',
        baseCurrency: 'Base Currency',
        quoteCurrency: 'Quote Currency',
        options: 'Options',
        themes: 'Themes'
      },
      he: {
        currencyConverter: 'ממיר ערך מטבע',
        reverseCurrencies: 'להחליף מטבעות',
        baseCurrency: 'מטבע מקור',
        quoteCurrency: 'מטבע יעד',
        options: 'אפשרויות',
        themes: 'ערכות'
      },
    };

    const handleLocalizationChange = () => {
      const locale = RNLocalize.getLocales()[0].languageCode;

      i18n.locale = locale;
    };
    i18n.fallbacks = true;
    i18n.defaultLocale = 'en';
  
    handleLocalizationChange();
    setLocalizationConfigured(true);
    RNLocalize.addEventListener('change', handleLocalizationChange);

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);
  return { localizationConfigured };
};
