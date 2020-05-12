import React, { useEffect } from 'react';
import Navigation from './config/Navigation';
import { ConversionContextProvider } from './util/ConversionContext';
import { initialize } from './util/Localization';

export default () => {
  useEffect(() => {
    initialize();
  }, []);

  return (
    <ConversionContextProvider>
      <Navigation />
    </ConversionContextProvider>
  );
};
