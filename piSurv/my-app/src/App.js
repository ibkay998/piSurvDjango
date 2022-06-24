import logo from './logo.svg';
import './App.css';
import Header from './components/header'
import Dashboard from './components/dashboard'

function App() {
  return (
    <div className="w-full bg-white h-screen ">
      <header className=" w-full flex-col">
        <Header/>
      </header>
      <div className = "h-full">
        <Dashboard/>
      </div>
      
      
    </div>
  );
}

export default App;
