import React from 'react';

interface CalculateWinnerI {
  result: null | string;
  lines: number[] | null;
  tie: boolean;
}

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
  for (const element of squares) {
    if (element == null) {
      numNulls += 1;
    }
  }
  const isBoardFull = numNulls < 1 ? true : false;

  // Primeiro, verificar se ganhou
  for (const element of lines) {
    const [a, b, c] = element;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        result: squares[a],
        lines: element,
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

describe('Testing Board Properties', () => {
  //TESTING COORDS CALCULATION
  test('Testing the function that calculates coords for each square', () => {
    expect(getCoordsOnBoard(0)).toEqual({row: 0, col: 0});
    expect(getCoordsOnBoard(1)).toEqual({row: 0, col: 1});
    expect(getCoordsOnBoard(2)).toEqual({row: 0, col: 2});
    expect(getCoordsOnBoard(3)).toEqual({row: 1, col: 0});
    expect(getCoordsOnBoard(4)).toEqual({row: 1, col: 1});
    expect(getCoordsOnBoard(5)).toEqual({row: 1, col: 2});
    expect(getCoordsOnBoard(6)).toEqual({row: 2, col: 0});
    expect(getCoordsOnBoard(7)).toEqual({row: 2, col: 1});
    expect(getCoordsOnBoard(8)).toEqual({row: 2, col: 2});
  });

  //TESTING CALCULATION OF WINNER
  test('Testing calculation of a winner', () => {
    const squares = Array(9).fill(null);
    const lines = [0, 1, 2];
    const player = 'X';
    for (let i = 0; i < 9; i++) {
      if (lines.includes(i)) {
        squares[i] = player;
      }
    }
    const result = calculateWinner(squares);
    expect(result).toEqual({
      result: player,
      lines: lines,
      tie: false,
    });
  });

  //TESTING CALCULATION OF TIE
  test('Testing calculation of a tie', () => {
    const squares = Array(9).fill(null);
    const player1 = 'X';
    const player2 = 'O';
    squares[0] = player1;
    squares[1] = player2;
    squares[2] = player1;
    squares[3] = player1;
    squares[4] = player2;
    squares[5] = player1;
    squares[6] = player2;
    squares[7] = player1;
    squares[8] = player2;
    const result = calculateWinner(squares);
    expect(result).toEqual({
      result: null,
      lines: null,
      tie: true,
    });
  });

  //TESTING BOARD DURING A GAME SITUATION
  test('Testing a normal board configuration', () => {
    const squares = Array(9).fill(null);
    const player1 = 'X';
    const player2 = 'O';
    squares[0] = player1;
    squares[1] = player2;
    const result = calculateWinner(squares);
    expect(result).toEqual({
      result: null,
      lines: null,
      tie: false,
    });
  });
});
