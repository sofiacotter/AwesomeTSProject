import React from 'react';
import renderer from 'react-test-renderer';
import Square from '../src/main_components/Square';
import {fireEvent, render, screen} from '@testing-library/react-native';

describe('Testing Square properties', () => {
  //TESTING SQUARE RENDERING
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

  //TESTING SQUARE BUTTON
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
    expect(squarePressable).toBeTruthy();
    expect(squarePressable).not.toBeFalsy();
    expect(textId).toBeDefined();
    expect(screen.getByText('X')).toBeTruthy();
    expect(screen.getByText('X')).not.toBeFalsy();
  });

  //TESTING THE CHANGE OF COLOR ON A WINNING SQUARE
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
  //TESTING SQUARE CLICKS
  test('Fill square with X', () => {
    const onClickHandle = jest.fn();
    render(<Square isWin={false} value={null} onClick={onClickHandle} />);
    fireEvent.press(screen.queryByTestId('squarePressId'));
    expect(onClickHandle).toHaveBeenCalledTimes(1);
    expect(onClickHandle).toHaveBeenCalled();
  });
});
