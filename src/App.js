import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <>
            <div>
              <input name="token" type="hidden" value="gAT7X7sP34niWmUPsE7eL3GNUyfEpONEdZLM" />
              <input name="cmd" type="hidden" value="chat" />
              <input name="id" type="hidden" value="B13Q796MGP" />
            </div>
            <div>
              <label htmlFor="to">Para:</label>
            </div>
            <div>
              <input id="to" name="to" type="text" />
            </div>
            <div>
              <label htmlFor="msg">Mensagem:</label>
            </div>
            <div>
              <textarea id="msg" name="msg"></textarea>
            </div>
            <button type="submit">Enviar</button>
          </>
      </header>
    </div>
  );
}

export default App;
