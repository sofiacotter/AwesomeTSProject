import React from 'react';
import {Pressable} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import stylesheet from '../styles/stylesheet';

/* Function components: Componentes que apenas contém método render()
e não mantêm estado próprio. Em vez de serem definidos como uma classe
que estende de React.Component, são funções que incluem props como input
e retornam o que deve ser renderizado */

/*É importante fazer assign de keys em listas, para definir a sua ordem
e as operações e remover, adicionar, substituir... as keys não têm de ser
únicas globalmnte, mas sim entre componentes e os seus "irmãos".
<li key={this.props.id}> */

/* Variáveis imutáveis: não substituir as variáveis diretamente, mas sim
por uma cópia das mesmas, alterada */

interface SquareProps {
  isWin: boolean | null;
  value: null | string;
  onClick: () => void;
}

const Square = ({isWin, value, onClick}: SquareProps): JSX.Element => {
  const scale = useSharedValue(2);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      //opacity: progress.value,
      transform: [{scale: scale.value}],
    };
  }, []);

  const playAnimation = (): void => {
    scale.value = withRepeat(withSpring(1), 2, true);
  };
  const combPress = (): void => {
    playAnimation();
    onClick();
  };

  return (
    <Pressable
      style={isWin ? stylesheet.winsquare : stylesheet.square}
      onPress={combPress}
      testID="squarePressId">
      <Animated.Text style={(stylesheet.text, animatedStyles)} testID="textId">
        {value}
      </Animated.Text>
    </Pressable>
  );
};

export default Square;
