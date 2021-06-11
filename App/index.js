import React from 'react';
import RNBootSplash from "react-native-bootsplash";
import Navigation from './config/Navigation';
import { ConversionContextProvider } from './util/ConversionContext';
import { useLocalization } from './util/Localization';


export default () => {
  RNBootSplash.hide(); // immediate
  const { localizationConfigured } = useLocalization();

  if (!localizationConfigured) {
    return null;
  }
  return (
    <ConversionContextProvider>
      <Navigation />
    </ConversionContextProvider>
  );
};
