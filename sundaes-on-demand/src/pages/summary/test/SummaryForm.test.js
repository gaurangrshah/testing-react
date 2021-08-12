import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import SummaryForm from "../SummaryForm"

describe('order confirmation button and checkbox', () => {

  let checkbox, confirmButton;

  beforeEach(() => {
    render(<SummaryForm/>)
    checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
    confirmButton = screen.getByRole('button', {name: /confirm order/i})
  })

  test('elements exists', () => {
    expect(checkbox).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  })
  test('checkbox should be unchecked and button disabled', () => {
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled();
  })
  
  test('when checked button should be disabled and vice-versa', () => {
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(confirmButton).toBeEnabled();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(confirmButton).toBeDisabled(); 
  })
})

describe('terms and conditions popover', () => {

  let nullPopover, termsAndConditions;

  beforeEach(() => {
    render(<SummaryForm/>)
    nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
    termsAndConditions = screen.queryByText(/terms and conditions/i)
  })

  test('popover responds to hover', async () => {
    // initialized as hidden
    expect(nullPopover).not.toBeInTheDocument()

    // appears on mouseover
    userEvent.hover(termsAndConditions)
    const popover = screen.queryByText(/no ice cream will actually be delivered/i)
    expect(popover).toBeInTheDocument();
    // disappears on mouseout
    userEvent.unhover(termsAndConditions);
    // const nullPopoverAgain = screen.queryByText(/no ice cream will actually be delivered/i)
    // expect(nullPopoverAgain).not.toBeInTheDocument()
    await waitForElementToBeRemoved(() => {
      return screen.queryByText(/no ice cream will actually be delivered/i)
    })

  })
})