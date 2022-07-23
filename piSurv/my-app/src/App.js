
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Switch,
  Route,} from "react-router-dom";
import Surveys from './routes/Surveys';

import Header from './components/header'
import Dashboard from './components/dashboard'
import { StateProvider } from './components/StateProvider';
import reducer, { initialState } from './components/reducer';

function App() {
  return (
    
    <div className="w-full bg-white h-screen ">
      <header className=" w-full flex-col">
        <Header/>
      </header>
      <div className = "h-full">
      <StateProvider initialState={initialState}
          reducer={reducer}>
        <Dashboard/>
      </StateProvider>
      
      </div>
      
      
      
    </div>
  );
}

export default App;
