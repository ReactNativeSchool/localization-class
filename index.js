/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App/index';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

AppRegistry.registerComponent(appName, () => App);
