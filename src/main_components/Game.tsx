import React, {useEffect, useState} from 'react';
import Board from './Board';
import Popup from '../aux_components/Popup';
import {View, Pressable, Text, ImageBackground} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import stylesheet from '../styles/stylesheet';
import {
  SharedValue,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import ButtonClickAnimation from '../aux_components/ButtonClickAnimation';

interface historyI {
  squares: (null | string)[];
  row: null | number;
  col: null | number;
}

interface CalculateWinnerI {
  result: null | string;
  lines: number[] | null;
  tie: boolean;
}

interface ParamsReceivedI {
  lastClickedReceived: number | undefined;
  changeBoard: boolean;
}

const Game = ({route, navigation}): JSX.Element => {
  //----- PARAMETROS RECEBIDOS INICIALMENTE OU OUTRO SCREEN -------
  const params: ParamsReceivedI = route.params;
  const [history, sethistory] = useState<historyI[]>([
    {
      squares: Array(9).fill(null),
      row: null,
      col: null,
    },
  ]);
  const [stepNumber, setstepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  const [lastClicked, setlastclicked] =
    useState<ParamsReceivedI['lastClickedReceived']>(undefined);
  const [isModal, setisModal] = useState(false);
  const [changeBoard, setchangeBoard] = useState(params.changeBoard);
  const [statusState, setstatusState] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      console.log('-------------------- PARAMS GAME --------------------- ');
      console.log('params.lastClickedReceived: ', params.lastClickedReceived);
      console.log('params.changeBoard: ', params.changeBoard);
      console.log('changeBoard: ', changeBoard);
      console.log('history: ', history);
      console.log('PARAMS: ', JSON.stringify(params));
    }, []),
  );

  const handleClick = (i: number): void => {
    const history_sliced = history.slice(0, stepNumber + 1);
    const current = history_sliced[history_sliced.length - 1];
    const squares = current.squares.slice();

    //Se o quadrado já está preenchido, não faz nada
    if (calculateWinner(squares).result || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? '🦋' : '⭐️';

    sethistory(
      history_sliced.concat([
        {
          squares,
          row: getCoordsOnBoard(i).row,
          col: getCoordsOnBoard(i).col,
        },
      ]),
    );
    setstepNumber(history_sliced.length);
    setxIsNext(!xIsNext);
  };

  const goToGameStart = () => {
    setstepNumber(0);
    setxIsNext(true);
    setlastclicked(undefined);
    //Voltar a colocar um array com apenas 1 entrada inicial, tudo a nulls
    sethistory([
      {
        squares: Array(9).fill(null),
        row: null,
        col: null,
      },
    ]);
  };

  const moves = history.map((step, move) => {
    const row = history[move].row;
    const col = history[move].col;

    //Se já há histórico (há pelo menos 1 jogada)
    if (!(row == null || col == null)) {
      return {move: move, row: row, col: col};
    }
  });

  const current = history[stepNumber];
  const {result, lines, tie}: CalculateWinnerI = calculateWinner(
    current.squares,
  );

  /*
    NÃO POSSO ALTERAR VARIÁVEIS DE ESTADO À TOA! TEM DE SER DENTRO DE UM USEFFECT()!
    Se ele não tivesse a escutar especificamente uma variável, só ia correr o useEffect() no mount 
    ou unMount (se tiver return). Se não colocar variáveis no array de escuta/dependencias, só efetua 
    um useEffect().  Se eu não especificar o array de dependências, o useEffect()
    olha apenas para as variáveis alteradas no interior da função (neste caso, seria apenas o 'isModal').
    Como o array de dependências tem [tie, result, xIsNext], sempre que algum destes altera, corre o
    useEffect() 
    */
  useEffect(() => {
    setstatusState('Next player: ' + (xIsNext ? '🦋' : '⭐️'));
    if (tie) {
      setisModal(true);
    }
    if (result) {
      setstatusState(result + ' is the winner!');
      setisModal(true);
    } else if (tie && !result) {
      setstatusState('You are both losers!');
      setisModal(true);
    }
  }, [tie, result, xIsNext]);

  /* useFocusEffect corre quando entro numa componente (esta página Game). 
  Se a página fosse destruída, o useEffect funcionava, mas
  como não está a ser destruída, não funciona. 
  https://reactnavigation.org/docs/use-focus-effect*/

  useFocusEffect(
    React.useCallback(() => {
      if (route.params.lastClickedReceived) {
        console.log('USE EFFECT!');
        const lc = route.params.lastClickedReceived;
        setxIsNext(lc % 2 === 0);
        setlastclicked(lc);
        setstepNumber(lc);
      }
    }, [route.params.lastClickedReceived]),
  );

  /* VERIFICAR SE A COMPONENTE FOI MOUNTED (CONSTRUÍDA) OU UNMOUNTED (DESTRUÍDA)
  Neste caso, nunca está a ser destruída, por isso o useEffect nunca ia funcionar. */
  React.useEffect(() => {
    console.log('COMPONENT MOUNTED');
    return () => {
      console.log('COMPONENT UNMOUNTED');
    };
  }, []);

  const scale = useSharedValue(1);
  const playAnimation = (s: SharedValue<number>): void => {
    s.value = withRepeat(withSpring(0.8), 2, true);
  };

  const image = {
    uri: 'https://i.pinimg.com/originals/22/d5/4b/22d54b0a921287519d4e5592245d48b9.jpg',
  };

  //control+command+space --> para emojis
  return (
    <View style={stylesheet.container}>
      <ImageBackground
        source={image}
        style={stylesheet.backgroundImage}
        resizeMode="cover">
        {isModal ? (
          <Popup
            statusState={statusState}
            openModal={() => setisModal(false)}
            goToGameStart={() => goToGameStart()}
          />
        ) : (
          <></>
        )}
        <View style={stylesheet.bloco1}>
          <Text style={stylesheet.title}>🧚🏼‍♀️ Tic Tac Toe! 🧚🏼‍♀️</Text>
          <ButtonClickAnimation scale={scale}>
            <Pressable
              style={stylesheet.gamestartbutton}
              onPress={() => {
                playAnimation(scale);
                goToGameStart();
              }}>
              <Text style={stylesheet.buttontext}>NEW GAME!</Text>
            </Pressable>
          </ButtonClickAnimation>
          <Text style={stylesheet.status}>{statusState}</Text>
        </View>
        <View style={stylesheet.bloco2}>
          <Board
            squares={current.squares}
            lines={lines}
            onClick={i => handleClick(i)}
          />
        </View>
        <View style={stylesheet.bloco3}>
          <Pressable
            style={stylesheet.actionsbutton}
            onPress={() => {
              // playAnimation(n);
              navigation.navigate('Historic', {
                params: {moves: moves},
              });
              setchangeBoard(!changeBoard);
            }}>
            <Text style={stylesheet.buttontext}>YOUR ACTIONS!</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const calculateWinner = (squares: (null | string)[]): CalculateWinnerI => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let numNulls = 0;
  for (let n = 0; n < squares.length; n++) {
    if (squares[n] == null) {
      numNulls += 1;
    }
  }
  const isBoardFull = numNulls < 1 ? true : false;

  // Primeiro, verificar se ganhou
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        result: squares[a],
        lines: lines[i],
        tie: false,
      };
    }
  }

  //Se não ganhou, verificar se o tabuleiro está cheio (empate)
  if (isBoardFull) {
    return {
      result: null,
      lines: null,
      tie: true,
    };

    //Se não ganhou, nem houve empate, o jogo continua
  } else {
    return {
      result: null,
      lines: null,
      tie: false,
    };
  }
};

const getCoordsOnBoard = (i: number): {row: number; col: number} => {
  const coords = {
    row: Math.floor(i / 3),
    col: i % 3,
  };
  return coords;
};

export default Game;
