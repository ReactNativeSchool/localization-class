import React from 'react';
import 'react-native-gesture-handler';

import Navigation from './config/Navigation';
import { ConversionContextProvider } from './util/ConversionContext';

export default () => (
  <ConversionContextProvider>
    <Navigation />
  </ConversionContextProvider>
);
