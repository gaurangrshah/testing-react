import { useState } from "react"
import logo from './logo.svg';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  return (
    <div className="App">
      <button style={{ backgroundColor: buttonColor, color: 'white' }} onClick={() => setButtonColor(newButtonColor)} disabled={disabled}>
        Change to {newButtonColor}
      </button>
      <input id="disable-button-checkbox" type="checkbox" onClick={() => setDisabled(!disabled)}/>
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;