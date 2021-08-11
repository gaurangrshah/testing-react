import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';



test('button has correct initial color and when clicked', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })

  // fireEvent is used to test event based interactions
  fireEvent.click(colorButton)
  // after the click the button color should be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
  expect(colorButton.textContent).toBe('Change to red')

});

test('initial button conditions', () => {
  render(<App/>)
  const colorButton = screen.getByRole('button', {name: 'Change to blue'})
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  // using the not method to negate the assertion toBeChecked
  expect(checkbox).not.toBeChecked()
})

test('checkbox disables and enables button', () => {
  render(<App/>)
  const colorButton = screen.getByRole('button')
  const checkbox = screen.getByRole('checkbox', {name: 'Disable button'})

  fireEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(colorButton).toBeDisabled()
})