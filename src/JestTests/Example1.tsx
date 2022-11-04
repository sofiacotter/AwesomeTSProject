import {useSharedValue, withRepeat, withSpring} from 'react-native-reanimated';
import React from 'react';
import {Pressable, View} from 'react-native';
const Teste = () => {
  const scale = useSharedValue(2);

  const playAnimation = (): void => {
    scale.value = withRepeat(withSpring(1), 2, true);
  };

  return (
    <View>
      <h1>Hello World</h1>
      <Pressable onPress={playAnimation}>Press me</Pressable>
    </View>
  );
};

export default Teste;
