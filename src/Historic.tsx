import React, {useState} from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SharedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import ButtonClickAnimation from './ButtonClickAnimation';
import stylesheet from './stylesheet';

interface MovesInterface {
  move: number;
  row: number;
  col: number;
}
interface ParamsInterface {
  moves: MovesInterface[];
  isDesc: boolean;
}
export type lastClickedType = undefined | number;

const Historic = ({route, navigation}) => {
  const {params}: ParamsInterface[] = route.params; //o primeiro é undefined
  console.log('------------------ PARAMS HISTORIC ------------------- ');
  console.log('params.isDesc: ', params.isDesc);
  console.log('params.moves: ', params.moves);

  //-------- VARIÁVEIS DE ESTADO -------
  const [isDesc, setisDesc] = useState(params.isDesc);
  const [lastClicked, setlastclicked] = useState<lastClickedType>(); //se não definir aqui nada, ele outros tipos (e.g. undefined)
  const [movesOrdered, setmovesOrdered] = useState(params.moves);

  //------- ANIMAÇÃO DO BOTÃO DESC -----
  const scale = useSharedValue(1);

  const playAnimation = (s: SharedValue<number>): void => {
    s.value = withRepeat(withSpring(0.8), 2, true);
  };

  //---------- MUDAR ESTADO ------------
  const changeOrder = () => {
    setisDesc(!isDesc);
    const movesOrderedChange = isDesc
      ? movesOrdered.slice()
      : movesOrdered.slice().reverse();
    setmovesOrdered(movesOrderedChange);
  };

  const jumpTo = (step: lastClickedType) => {
    setlastclicked(step);
  };

  const movesToRender = movesOrdered.map((s: MovesInterface) => {
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
              ? historicstyle.historicbuttonbold
              : historicstyle.historicbutton
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

  //Preciso de enviar de volta o "step" que é o "move" (nº do botão)
  //---------- RENDERIZAÇÃO ------------
  const image = {
    uri: 'https://i.pinimg.com/originals/22/d5/4b/22d54b0a921287519d4e5592245d48b9.jpg',
  };
  return (
    <View style={historicstyle.container}>
      <View style={historicstyle.bloco1}>
        <Pressable
          style={historicstyle.actionsbutton}
          onPress={() => {
            playAnimation(scale);
            navigation.navigate({
              name: 'Game',
              params: {
                lastClickedReceived: lastClicked,
                isDescReceived: isDesc,
              },
              merge: true,
            });
          }}>
          <Text style={stylesheet.buttontext}>APPLY CHANGES</Text>
        </Pressable>
        <ButtonClickAnimation scale={scale}>
          <Pressable
            style={historicstyle.actionsbutton}
            onPress={() => {
              changeOrder();
              playAnimation(scale);
            }}>
            <Text style={stylesheet.buttontext}>
              ORDER: {isDesc ? 'DESC ⬇️' : 'ASC ⬆️'}
            </Text>
          </Pressable>
        </ButtonClickAnimation>
      </View>
      <View style={historicstyle.bloco2}>{movesToRender}</View>
    </View>
  );
};

const historicstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0ffff',
    height: '100%',
  },
  bloco1: {
    backgroudColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'column',
  },
  bloco2: {
    flexDirection: 'column',
    flex: 2,
    backgroudColor: 'green',
    alignItems: 'center',
    textAlign: 'center',
  },
  actionsbutton: {
    padding: '2%',
    margin: '2%',
    width: '70%',
    paddingHorizontal: '10%',
    borderWidth: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#b0e0e6',
    fontFamily: 'Cochin-BoldItalic',
    fontSize: 18,
    color: 'black',
  },
  historicbutton: {
    margin: '1%',
    padding: '2%',
    width: '70%',
    marginHorizontal: '5%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#b0e0e6',
  },
  historicbuttonbold: {
    margin: '1%',
    padding: '2%',
    width: '72%',
    marginHorizontal: '5%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fffa',
    borderColor: '#008B8B',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Historic;
