import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Game from './Game';
import Historic from './Historic';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

/*
SOBRE BACK BUTTONS
https://stackoverflow.com/questions/71155215/remove-back-button-from-header-in-react-native-and-react-navigation
*/
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Game">
        <Stack.Screen
          name="Game"
          component={Game}
          initialParams={{lastClickedReceived: undefined, changeBoard: false}}
        />
        <Stack.Screen
          name="Historic"
          component={Historic}
          options={{headerBackVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
