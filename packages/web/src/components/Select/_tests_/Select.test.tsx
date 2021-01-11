import React from 'react';
import { render } from '@testing-library/react';

import Select from '..';

test('renders a Select', () => {
  const { container } = render(<Select selectItens={[{ key: 1, value: 'test', label: 'test' }]} />);
  expect(container.firstChild).toMatchSnapshot();
});
