import i18n from 'i18n-js';

export const initialize = () => {
  i18n.locale = 'en';
  i18n.translations = {
    en: {
      currencyConverter: 'Currency Converter',
    },
  };
};
