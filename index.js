/** @format */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { pushNotifications } from './src/Services';

pushNotifications.configure();

AppRegistry.registerComponent(appName, () => App);
