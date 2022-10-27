import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Game from './Game';
import Historic from './Historic';

/*
<Stack.Screen name="Home">
          {(props) => <HomeScreen {props} extraData={someData} />}
        </Stack.Screen>
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
        <Stack.Screen name="Historic" component={Historic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
