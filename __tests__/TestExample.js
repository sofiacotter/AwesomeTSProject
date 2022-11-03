import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../src/Example';

test('renders correctly', () => {
  const tree = renderer.create(<Example />).toJSON();
  expect(tree).toMatchSnapshot();
});
