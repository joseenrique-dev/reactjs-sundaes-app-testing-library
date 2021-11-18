import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update scoop subtotal when scoop change', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

  //make sure total start al $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  //update vanilla scoop to 1 and check the subtotal
  const vanillaScoop = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaScoop);
  userEvent.type(vanillaScoop, '1');

  expect(scoopsSubtotal).toHaveTextContent('2.00');

  //update chocolate scoop to 2 and check subtotal
  const chocolateScoop = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});
