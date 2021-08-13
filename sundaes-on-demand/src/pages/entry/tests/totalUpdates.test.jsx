import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options"

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops"/>)

  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText('Scoops total: $', {exact: false}) // unstrict matching
  expect(scoopSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1')
  expect(scoopSubtotal).toHaveTextContent('2.00')

  // update choclate scoops to 2 and check the subtotal
  const choclateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
  userEvent.clear(choclateInput)
  userEvent.type(choclateInput, '2')
  expect(scoopSubtotal).toHaveTextContent('6.00')
})