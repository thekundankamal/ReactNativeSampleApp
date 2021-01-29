/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import NotificationContainer from './component/NotificationContainer'
import {name as appName} from './app.json';
AppRegistry.registerComponent(appName, () => NotificationContainer);
