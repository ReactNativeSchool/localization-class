import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import i18n from 'i18n-js';
import { API_KEY } from "@env";

import { apiRates } from './api';


export const ConversionContext = createContext();
const DEFAULT_BASE_CURRENCY = 'USD';
const DEFAULT_QUOTE_CURRENCY = 'ILS';

export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQuoteCurrency] = useState(DEFAULT_QUOTE_CURRENCY);
  const [date, setDate] = useState();
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setCurrlng] = useState(i18n.locale);
  const [currencies, setCurrencies] = useState([]);

  const setLang = (lng) => {
    i18n.locale = lng;
    setCurrlng(lng);
  };
  const setBaseCurrency = (currency, _quoteCurrency = 'ILS') => {
    setIsLoading(true);
    console.log(`trying to fetch: ${currency}, ${_quoteCurrency}`);
    return apiRates(currency, _quoteCurrency)
      .then((res) => {
        _setBaseCurrency(currency);
        setDate(res.date);
        setRates(res.rates);
      })
      .catch((error) => {
        Alert.alert('Sorry, something went wrong.', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency, baseCurrency);
    setQuoteCurrency(baseCurrency);
  };

  const getCurrencies = () => {
    setIsLoading(true);
    return fetch(
      `https://free.currconv.com/api/v7/currencies?apiKey=${API_KEY}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        setCurrencies(Object.keys(res.results).sort());
      })
      .catch((error) => {
        Alert.alert('Sorry, fetch currencies went wrong.', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getCurrencies();
  }, []);
  useEffect(() => {
    if (currencies.length) setBaseCurrency(DEFAULT_BASE_CURRENCY);
  }, [currencies]);

  const contextValue = {
    baseCurrency,
    quoteCurrency,
    setBaseCurrency,
    setQuoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
    setLang,
    locale,
    currencies,
  };

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
