import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

export const initialize = () => {
  const locale = RNLocalize.getLocales()[0].languageCode;

  i18n.locale = locale;
  i18n.translations = {
    en: {
      currencyConverter: 'Currency Converter',
    },
    es: {
      currencyConverter: 'Convertidor de Moneda',
    },
  };
};
