import Counter from '.';
import { render, screen } from './test/utilities';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByLabelText('counter');
  expect(currentCount).toHaveTextContent('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByLabelText('count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={10} />);

  const currentCount = screen.getByLabelText('count');
  expect(currentCount).toHaveTextContent('10');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={15} />);

  const currentCount = screen.getByLabelText('count');
  const incrementButton = screen.getByRole('button', { name: /increment/i });
  const resetButton = screen.getByRole('button', { name: /reset/i });

  expect(currentCount).toHaveTextContent('15');

  await user.click(incrementButton);
  await user.click(incrementButton);
  await user.click(incrementButton);

  expect(currentCount).toHaveTextContent('18');

  await user.click(resetButton);

  expect(currentCount).toHaveTextContent('0');
});
