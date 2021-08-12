import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

import {replaceCamelWithSpaces} from "./App"




describe('Button and Checkbox disable feature', () => {
  test('button has correct initial color and when clicked', () => {
    render(<App />)
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' })
    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

    // fireEvent is used to test event based interactions
    fireEvent.click(colorButton)
    // after the click the button color should be MidnightBlue
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })
    expect(colorButton.textContent).toBe('Change to MediumVioletRed')

  });

  test('initial button conditions', () => {
    render(<App />)
    const colorButton = screen.getByRole('button', { name: 'Change to MidnightBlue' })
    expect(colorButton).toBeEnabled()

    const checkbox = screen.getByRole('checkbox')
    // using the not method to negate the assertion toBeChecked
    expect(checkbox).not.toBeChecked()
  })

  test('checkbox disables and enables button', () => {
    render(<App />)
    const colorButton = screen.getByRole('button')
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(colorButton).toBeDisabled()
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })
  })

  test('button color is gray when disabled', () => {
    render(<App />)
    const colorButton = screen.getByRole('button')
    const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

    // check if button is grayed-out when disabled
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(colorButton).toBeDisabled()
    expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

    // ensure button color is restored when enabled
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(colorButton).toBeEnabled()
    expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
    fireEvent.click(colorButton)
    expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })
  })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe("Red")
  })
  test('Works one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe("Midnight Blue")
  })
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe("Medium Violet Red")
  })
})