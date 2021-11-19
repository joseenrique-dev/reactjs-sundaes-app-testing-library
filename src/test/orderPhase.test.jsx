import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Final Exam', () => {
  test('order phases for happy path', async () => {
    //render app
    render(<App />);

    //add ice cream scoops and toppings
    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: 'Vanilla',
    });
    userEvent.clear(vanillaScoop);
    userEvent.type(vanillaScoop, '1');

    const toppingsInput = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.clear(toppingsInput);
    userEvent.click(toppingsInput);

    //find and click order summarybutton
    const btnSundae = screen.getByRole('button', { name: /order sundae/i });
    userEvent.click(btnSundae);

    //check summary information based om order
    const headerInfo = screen.getByRole('header', { name: 'Order Summary' });
    expect(headerInfo).toBeInTheDocument();

    const scoopsHeading = screen.getByRole('heading', {
      name: 'Scoops: $3.50',
    });
    expect(scoopsHeading).toBeInTheDocument();
    const tappingsHeading = screen.getByRole('heading', {
      name: 'Tappings: $1.50',
    });
    expect(tappingsHeading).toBeInTheDocument();

    //check summary option item
    expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
    expect(screen.getByText('Cherries')).toBeInTheDocument();

    //accept term and conditions and click button to confirm order
    const checkTerm = screen.getByRole('checkbox', {
      name: /term and conditions/i,
    });
    userEvent.click(checkTerm);

    //confirm order
    const btnConfirm = screen.getByRole('button', { name: /confirm order/i });
    userEvent.click(btnConfirm);

    //confirm order number on confirmation page
    //this one is async because is a POST request to server
    const tyHeading = await screen.findByRole('heading', {
      name: /thank you/i,
    });
    expect(tyHeading).toBeInTheDocument();

    //click new order btn
    const btnNewOrder = screen.getByRole('button', { name: /new order/i });
    userEvent.click(btnNewOrder);

    //check that scoops and toppings have been reset
    const scoopTotal = screen.getByText('Scoops total: $0.00');
    expect(scoopTotal).toBeInTheDocument();
    const toppingTotal = screen.getByText('Toppings total: $0.00');
    expect(toppingTotal).toBeInTheDocument();
  });
});
