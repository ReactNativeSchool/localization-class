import { useEffect } from 'react';
import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

export const useLocalization = () => {
  useEffect(() => {
    i18n.translations = {
      en: {
        currencyConverter: 'Currency Converter',
      },
      es: {
        currencyConverter: 'Convertidor de Moneda',
      },
    };

    const handleLocalizationChange = () => {
      const locale = RNLocalize.getLocales()[0].languageCode;

      i18n.locale = locale;
    };

    handleLocalizationChange();

    RNLocalize.addEventListener('change', handleLocalizationChange);

    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);
};
