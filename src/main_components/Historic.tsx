import React, {useState} from 'react';
import stylesheet_hist from '../styles/stylesheet_hist';
import {ImageBackground, Pressable, Text, View} from 'react-native';
import {
  SharedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import ButtonClickAnimation from '../aux_components/ButtonClickAnimation';
import stylesheet from '../styles/stylesheet';

interface MovesInterface {
  move: number;
  row: number;
  col: number;
}

export type lastClickedType = undefined | number;

const Historic = ({route, navigation}) => {
  const {params}: MovesInterface[] = route.params; //o primeiro é undefined
  console.log('------------------ PARAMS HISTORIC ------------------- ');
  console.log('params.moves: ', params.moves);

  //----------------- VARIÁVEIS DE ESTADO -------------
  const [isDesc, setisDesc] = useState(true);
  const [lastClicked, setlastclicked] = useState<lastClickedType>(); //se não definir aqui nada, ele outros tipos (e.g. undefined)

  //--------------- ANIMAÇÃO DO BOTÃO DESC -----------
  const scale = useSharedValue(1);

  const playAnimation = (s: SharedValue<number>): void => {
    s.value = withRepeat(withSpring(0.8), 2, true);
  };

  //------------- MUDAR ESTADO DE ORDEM --------------
  const changeOrder = () => {
    const b = isDesc ? false : true;
    setisDesc(b);
  };

  const jumpTo = (step: lastClickedType) => {
    console.log('CLIQUEI:, step');
    setlastclicked(step);
  };

  const movesOrderedChange = isDesc
    ? params.moves.slice()
    : params.moves.slice().reverse();
  const movesToRender = movesOrderedChange.map((s: MovesInterface) => {
    if (s) {
      const col = s.col;
      const row = s.row;
      const move = s.move;
      const message =
        'Go to move #' + move + ' [row: ' + row + ', col: ' + col + ']';
      return (
        <Pressable
          key={move}
          style={
            !!lastClicked && lastClicked === move
              ? stylesheet_hist.historicbuttonbold
              : stylesheet_hist.historicbutton
          }
          onPress={() => jumpTo(move)}>
          <Text
            style={
              !!lastClicked && lastClicked === move
                ? stylesheet.historictextbold
                : stylesheet.historictext
            }>
            {message}
          </Text>
        </Pressable>
      );
    }
  });

  const navigateBack = React.useCallback(() => {
    console.log('LAST CLICKED: ', lastClicked);
    playAnimation(scale);
    navigation.navigate({
      name: 'Game',
      params: {
        lastClickedReceived: lastClicked,
        changeBoard: true,
      },
      merge: true,
    });
  }, [lastClicked, navigation, scale]);

  //---------- RENDERIZAÇÃO ------------
  const image = {
    uri: 'https://i.pinimg.com/originals/22/d5/4b/22d54b0a921287519d4e5592245d48b9.jpg',
  };
  return (
    <View style={stylesheet_hist.container}>
      <ImageBackground
        source={image}
        style={stylesheet.backgroundImage}
        resizeMode="cover">
        <View style={stylesheet_hist.bloco1}>
          <Pressable
            style={stylesheet_hist.actionsbutton}
            onPress={navigateBack}>
            <Text style={stylesheet.buttontext}>APPLY CHANGES</Text>
          </Pressable>
        </View>
        <ButtonClickAnimation scale={scale}>
          <Pressable
            style={stylesheet_hist.actionsbutton}
            onPress={() => {
              changeOrder();
              playAnimation(scale);
            }}>
            <Text style={stylesheet.buttontext}>
              ORDER: {isDesc ? 'DESC ⬇️' : 'ASC ⬆️'}
            </Text>
          </Pressable>
        </ButtonClickAnimation>
        <View style={stylesheet_hist.bloco2}>{movesToRender}</View>
      </ImageBackground>
    </View>
  );
};

export default Historic;
