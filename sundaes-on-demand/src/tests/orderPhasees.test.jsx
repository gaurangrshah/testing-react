import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases - happy path", async () => {
  // render App
  render(<App />);

  // setup
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(chocolateInput);

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).toBeInTheDocument();

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  expect(hotFudgeCheckbox).toBeInTheDocument();

  // add ice cream scoops and toppings
  // add scoops
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("4.00");
  // add toppings
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // find and click order button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument()
  const toppingsHeading = screen.getByRole('heading', {name: 'Toppings: $3.00'})
  expect(toppingsHeading).toBeInTheDocument()

  // check summary option items
  // expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order.
  const tcCheckbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
  userEvent.click(tcCheckbox)

  const confirmOrderButton = screen.getByRole('button', {name: /confirm order/i})
  userEvent.click(confirmOrderButton)

  // confirm order number on confirmation page
  const thankYouHeader = await screen.findByRole('heading', {name: /thank you/i})
  expect(thankYouHeader).toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  // click 'new order' button on confirmation page
  const newOrderButton = await screen.findByText(/new order/i)
  userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  expect(scoopSubtotal).toHaveTextContent("0.00")
  expect(scoopSubtotal).toBeInTheDocument();
  expect(toppingsSubtotal).toHaveTextContent("0.00")
  expect(toppingsSubtotal).toBeInTheDocument();

  // wait for items to appear so that Testing Library doesn't get angry about stuff
  // happening after test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
