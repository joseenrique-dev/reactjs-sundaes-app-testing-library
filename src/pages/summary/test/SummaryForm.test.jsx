import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

test('checkbox is unchecked by default', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test('unchecking checkbox again disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole('button', { name: /confirm order/i });
  fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();
  fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});
