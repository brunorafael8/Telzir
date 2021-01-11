import React from 'react';
import { render } from '@testing-library/react';

import 'jest-styled-components';
import Button from '..';

test('renders a Button', () => {
  const { container } = render(<Button>Click</Button>);
  expect(container.firstChild).toMatchSnapshot();
});
