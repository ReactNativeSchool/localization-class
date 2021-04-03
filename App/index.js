import React from 'react';
import Navigation from './config/Navigation';
import { ConversionContextProvider } from './util/ConversionContext';
import { useLocalization } from './util/Localization';

export default () => {
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
