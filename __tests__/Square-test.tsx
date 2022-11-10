import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../src/Square';
import {fireEvent, render, screen, within} from '@testing-library/react-native';

describe('Testing Square properties', () => {
  //TESTAR A RENDERIZAÇÃO DO QUADRADO
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

  //TESTAR DE O BOTÃO SÓ TEM OS VALORES NULL, 'X' OU 'O'
  test('Square should have particular values', () => {
    type SquareType = {
      t: 'X' | 'O' | null;
    };
    render(
      <Square
        isWin={true}
        value={'X'}
        onClick={function (): void {
          console.log('OnClick Square!');
        }}
      />,
    );
    const squarePressable = screen.queryByTestId('squarePressId');
    const textId = screen.queryByTestId('textId');
    expect(squarePressable).toBeDefined();
    expect(textId).toBeDefined();
    expect(screen.getByText('X')).toBeTruthy();
  });

  //TESTAR AS CORES A MUDAREM NO QUADRADO (isWin=true)
  test('Square changes to color green', () => {
    render(
      <Square
        isWin={false}
        value={'X'}
        onClick={function (): void {
          console.log('OnClick Square!');
        }}
      />,
    );
    expect(screen.queryByTestId('squarePressId')).toHaveStyle(
      "borderColor: '#f5fffa'",
    );
  });
});
