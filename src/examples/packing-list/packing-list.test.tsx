import { render, screen, waitFor } from 'test/utilities';
import { PackingList } from '.';
import { Provider } from 'react-redux';
import { createStore } from './store';

const renderPackingList = () => {
  const store = createStore();

  const { user } = render(
    <Provider store={store}>
      <PackingList />
    </Provider>,
  );

  const newItemButton = screen.getByRole('button', { name: /add new item/i });
  const newItemInput = screen.getByLabelText(/new item name/i, {
    selector: 'input',
  });

  return {
    user,
    newItemInput,
    newItemButton,
  };
};

it('renders the Packing List application', () => {
  renderPackingList();
});

it('has the correct title', async () => {
  renderPackingList();

  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  const { newItemInput } = renderPackingList();

  expect(newItemInput).toBeInTheDocument();
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  const { newItemInput, newItemButton } = renderPackingList();

  expect(newItemInput).toHaveValue('');
  expect(newItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { newItemInput, newItemButton, user } = renderPackingList();

  await user.type(newItemInput, 'Mac Book Pro');

  expect(newItemInput).toHaveValue('Mac Book Pro');
  expect(newItemButton).toBeEnabled();
});

it('removes an item', async () => {
  const { newItemInput, newItemButton, user } = renderPackingList();

  await user.type(newItemInput, 'Mac Book Pro');
  await user.click(newItemButton);

  const removeItem = screen.getByLabelText(/remove/i, { selector: 'button' });

  await user.click(removeItem);

  waitFor(() => expect(removeItem).not.toBeInTheDocument());
});
