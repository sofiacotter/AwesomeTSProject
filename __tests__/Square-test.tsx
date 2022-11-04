import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../src/Square';
import {fireEvent, render, within} from '@testing-library/react-native';
describe('user related actions', () => {
  //TESTAR A RENDERIZAÇÃO DO QUADRADO
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

  //TESTAR AS CORES A MUDAREM NO QUADRADO (isWin=true)
  //TESTAR DE O BOTÃO SÓ TEM OS VALORES NULL, 'X' OU 'O'
  /*
  it('Square should have particular values', () => {
    const squareTest = render(
      <Square
        isWin={true}
        value={'X'}
        onClick={function (): void {
          console.log('OnClick Square!');
        }}
      />,
    );
    const squareButton = within(squareTest.value).in
    fireEvent.press(screen.getByText('Print Username'));
  });
  */
});
