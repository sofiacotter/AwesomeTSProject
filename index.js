/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import Game from './src/Game';
import Square from './src/Square';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Game);
