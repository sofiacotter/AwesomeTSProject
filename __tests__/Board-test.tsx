import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../src/Square';
import {render, screen} from '@testing-library/react-native';
import {Text, View} from 'react-native';

describe('Testing Board Properties', () => {
  //TESTING BOARD RENDERING
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

  //TESTING COLORS ON WINNING SQUARE POSITIONS
  //TESTING VALUES ON WINNING SQUARES AND NORMAL SQUARES
  test('Winning squares and normal squares', () => {
    const onHandleClick = jest.fn();
    const renderSquare = (i: number): JSX.Element => {
      return (
        <Square
          key={i}
          value={i < 3 ? 'X' : null}
          isWin={i < 3 ? true : false}
          onClick={onHandleClick}
        />
      );
    };
    const createSquares = () => {
      let rows: JSX.Element[] = [];
      for (let i = 0; i < 3; i++) {
        let squaresArray: JSX.Element[] = [];
        for (let j = 0; j < 3; j++) {
          squaresArray.push(renderSquare(3 * i + j));
        }
        rows.push(<View key={i}>{squaresArray}</View>);
      }
      return rows;
    };
    render(<View>{createSquares()}</View>);
    const squares = screen.getAllByTestId('squarePressId');
    for (let i = 0; i < 9; i++) {
      if (i < 3) {
        expect(squares[i]).toHaveStyle("borderColor: '#f5fffa'"); //win square
      } else {
        expect(squares[4]).toHaveStyle("borderColor: '#b0e0e6'"); //not win square
      }
      const squaresTextId = squares[i].findByType(Text);
      expect(squaresTextId).toBeDefined();
      expect(squaresTextId).toBeTruthy();
    }
  });
});
