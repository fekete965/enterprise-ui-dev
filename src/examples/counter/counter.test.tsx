import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);

  const element = screen.getByLabelText('counter');
  expect(element).toBeInTheDocument();
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const count = screen.getByLabelText('count');
  const incrementBtn = screen.getByRole('button', { name: 'Increment' });

  expect(count).toHaveTextContent('0');
  await user.click(incrementBtn);
  expect(count).toHaveTextContent('1');
});
