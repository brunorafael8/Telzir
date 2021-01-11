import React from 'react';
import { render } from '@testing-library/react';

import Input from '..';

test('renders a Input', () => {
  const { container } = render(<Input />);
  expect(container.firstChild).toMatchSnapshot();
});
