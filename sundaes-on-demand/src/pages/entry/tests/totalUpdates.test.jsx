import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false }); // unstrict matching
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // update choclate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("topping options subtotal", async () => {
  render(<Options optionType="toppings" />);
  // ensure default subtotal === 0
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // find and check any single option and assert on updatedSubTotal
  // use await and find to get all fo the checkboxes
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  expect(cherriesCheckbox).toBeInTheDocument();
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // find and check another option and assert on updatedSubTotal
  // make sure the code can handle two simultaneous checkboxes selected
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot Fudge",
  });
  expect(hotFudgeCheckbox).toBeInTheDocument();
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");
  // selet and unselect an option and assert on updatedSubTotal
  // make sure the code can handle checking and unchecking.
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  let grandTotal;
  beforeEach(() => {
    render(<OrderEntry />);
    grandTotal = screen.getByRole('heading', {
      name: /grand total: \$/i,
    }); // escape the dollar sign with "\"
  })
  test("grand total starts at $0.00", () => {
    // render(<OrderEntry />);
    expect(grandTotal).toHaveTextContent("$0.00");
  });
  test("grand total updates properly if scoop is added first", async() => {
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });    
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, "2"); 
    expect(grandTotal).toHaveTextContent('4.00') 
    const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'})
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('5.50') 
  });
  test("grand total updates properly if topping is added first", async () => {
    const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'})
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('1.50') 
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });    
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1"); 
    expect(grandTotal).toHaveTextContent('3.50') 
  });
  test("grand total updates properly if an item is removed", async () => {
    // add cherreis
    const cherriesCheckbox = await screen.findByRole('checkbox', {
      name: 'Cherries',
    });
    userEvent.click(cherriesCheckbox);

    // update vanilla scoops to 2' total: $5.50
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });    
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2"); 
    expect(grandTotal).toHaveTextContent('5.50')

    // remove 1 scoop of vanilla; total: $3.50
    userEvent.type(vanillaInput, "1"); 
    expect(grandTotal).toHaveTextContent('3.50')

    // remove cherries; total: $2.00
    userEvent.click(cherriesCheckbox)
    expect(grandTotal).toHaveTextContent('2.00')
  });
});
