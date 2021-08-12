import SummaryForm from "./pages/summary/SummaryForm";

function App() {
  return (
    <div className="App" style={{backgroundColor: 'teal', color: 'ivory', minHeight: '100vh'}}>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React P
        </a>
      </header>
      <SummaryForm/>
    </div>
  );
}

export default App;
