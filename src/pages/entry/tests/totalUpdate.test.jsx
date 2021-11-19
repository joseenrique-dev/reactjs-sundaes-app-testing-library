import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

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

test('update toppings subtotal when toppings change', async () => {
  //render parent component
  render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider });

  //make sure toppings start out at $0.00
  const toppigsSubTotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppigsSubTotal).toHaveTextContent('0.00');

  //add cherries and check subtotal
  const scoopCherries = await screen.findByRole('checkbox', {
    name: 'Cherries',
  });
  userEvent.click(scoopCherries);
  expect(toppigsSubTotal).toHaveTextContent('1.50');

  //add hot budge and check subtotal
  const scoopHotFudge = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(scoopHotFudge);
  expect(toppigsSubTotal).toHaveTextContent('3.00');

  //remove hot budge and check subtotal
  userEvent.click(scoopHotFudge);
  expect(toppigsSubTotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });
    const initialTotal = screen.getByText('Grand total:', { exact: false });
    expect(initialTotal).toHaveTextContent('$0.00');
  });

  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');
    const grandTotal = screen.getByText('Grand total:', { exact: false });
    expect(grandTotal).toHaveTextContent('$2.00');
  });

  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const toppingValue = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    userEvent.clear(toppingValue);
    userEvent.type(toppingValue, '1');
    const grandTotal = screen.getByText('Grand total:', { exact: false });
    expect(grandTotal).toHaveTextContent('$1.50');
  });
  test('grand total updates properly if items is removed', async () => {
    render(<OrderEntry setOrderPhase={jest.fn()} />, {
      wrapper: OrderDetailsProvider,
    });

    const toppingValue = await screen.findByRole('checkbox', {
      name: 'M&Ms',
    });
    userEvent.clear(toppingValue);
    userEvent.type(toppingValue, '1');
    const grandTotal = screen.getByText('Grand total:', { exact: false });
    expect(grandTotal).toHaveTextContent('$1.50');
    userEvent.type(toppingValue, '0');
    expect(grandTotal).toHaveTextContent('$0.00');
  });
});
