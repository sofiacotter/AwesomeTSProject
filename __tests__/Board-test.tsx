import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../src/Square';
import {fireEvent, render, screen, within} from '@testing-library/react-native';
import Board from '../src/Board';
import {View} from 'react-native';

describe('Testing Board Properties', () => {
  //TESTAR A RENDERIZAÇÃO DO BOARD
  /*
  test('Square Test', () => {
    const tree = renderer
      .create(
        <Square
          isWin={false}
          value={'X'}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  */

  //CARREGAR NUM SQUARE NULL E ELE MUDAR PARA 'X'
  test('Square should have particular values', () => {
    function testClick(i: number): void {
      console.log('CLICOU NO SQUARE: ', i);
    }
    const isWin = false;
    const iSquare = 1;
    const squares = Array(9).fill(null);
    const renderSquare = (i: number): JSX.Element => {
      return (
        <Square
          key={i}
          value={squares[i]}
          isWin={isWin}
          onClick={() => {
            testClick(iSquare);
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
        rows.push(<View key={i}>{squares_array}</View>);
      }
      return rows;
    };
    render(<View>{createSquares()}</View>);

    const SquareButton = screen.queryAllByDisplayValue('o');
    fireEvent(SquareButton, 'click');
  });

  //CARREGAR NUM SQUARE 'X' E ELE NÃO FAZ NADA
  //CARREGAR NUM SQUARE EM LINHA DE 3 E ELES MUDAREM A COR PARA VERDE
});
