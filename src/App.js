// import logo from './logo.svg';
import './App.css';
import About from './components/About'
import Experiences from './components/Experiences'
import Skills from './components/Skills'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <About/>
        <Skills/>
        <Experiences/>
      </header>
    </div>
  );
}

export default App;
