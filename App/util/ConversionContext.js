import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import i18n from 'i18n-js';

import { api } from "./api";

export const ConversionContext = createContext();

const DEFAULT_BASE_CURRENCY = "USD";
const DEFAULT_QUOTE_CURRENCY = "GBP";

export const ConversionContextProvider = ({ children }) => {
  const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
  const [quoteCurrency, setQuoteCurrency] = useState(DEFAULT_QUOTE_CURRENCY);
  const [date, setDate] = useState();
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setCurrlng] = useState(i18n.locale);
  const [currencies, setCurrencies] = useState([]);

  const setLang = (lng) => {
    i18n.locale = lng
    setCurrlng(lng)
  }
  const setBaseCurrency = currency => {
    setIsLoading(true);

    return api(`/latest?base=${currency}`)
      .then(res => {
        _setBaseCurrency(currency);
        setDate(res.date);
        setRates(res.rates);
      })
      .catch(error => {
        Alert.alert("Sorry, something went wrong.", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const swapCurrencies = () => {
    setBaseCurrency(quoteCurrency);
    setQuoteCurrency(baseCurrency);
  };
  const apiKey = `4d4402f744491ea682a3`;
  const getCurrencies = () => {
 
    setIsLoading(true);
    return fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`)
      .then(res => res.json())
      .then(res => {
        
        setCurrencies(Object.keys(res.results).sort());
      })
      .catch(error => {
        Alert.alert("Sorry, faetch currencies went wrong.", error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }
  useEffect(() => {
    getCurrencies();
  }, []);
  useEffect(() => {
   if ( currencies.length ) setBaseCurrency(DEFAULT_BASE_CURRENCY);
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
    currencies
  };

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
