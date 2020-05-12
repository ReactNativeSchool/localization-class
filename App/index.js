import React from 'react';
import Navigation from './config/Navigation';
import { ConversionContextProvider } from './util/ConversionContext';
import { useLocalization } from './util/Localization';

export default () => {
  useLocalization();

  return (
    <ConversionContextProvider>
      <Navigation />
    </ConversionContextProvider>
  );
};
