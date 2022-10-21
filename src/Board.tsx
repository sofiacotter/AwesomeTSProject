import React from 'react';
import {View} from 'react-native';
import Square from './Square';
import stylesheet from './stylesheet';

interface BoardProps {
  squares: (null | string)[];
  lines: null | number[];
  onClick: (i: number) => void;
}

const Board = ({squares, lines, onClick}: BoardProps): JSX.Element => {
  const renderSquare = (i: number): JSX.Element => {
    const isWinningSquare: boolean | null = lines && lines.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        isWin={isWinningSquare}
        onClick={() => {
          onClick(i);
        }}
      />
    );
  };

  const createSquares = () => {
    let rows: JSX.Element[] = [];
    for (var i = 0; i < 3; i++) {
      let squares_array: JSX.Element[] = [];
      for (var j = 0; j < 3; j++) {
        squares_array.push(renderSquare(3 * i + j));
      }
      rows.push(
        <View style={stylesheet.linha} key={i}>
          {squares_array}
        </View>,
      );
    }
    return rows;
  };

  return <View style={stylesheet.coluna}>{createSquares()}</View>;
};

export default Board;
