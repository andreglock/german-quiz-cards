import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/Cards';

function App() {
  return (
    <div className="App">
      <header>
        <h1 className="mt-4">German Quiz Cards</h1>
      </header>
    <Cards />
    </div>
  );
}

export default App;
