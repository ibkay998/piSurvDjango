import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Dashboard from './components/dashboard'

function App() {
  return (
    <div className="w-full bg-white h-screen ">
      <header className=" w-full h-full flex-col">
        <Header/>
        <Dashboard/>
        <div>Testing it </div>
      </header>
      
    </div>
  );
}

export default App;
