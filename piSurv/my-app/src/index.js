import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,
  Route,} from "react-router-dom";
import Surveys from "./routes/Surveys";
import CombinedComponent from './components/CombinedComponent';
import CompanySurveys from './routes/CompanySurveys';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateSurveyComponent from './components/CreateSurveyComponent';
import CreateForm from './routes/CreateForm';
import Wordle from './routes/wordle';
import Wordle2 from './routes/wordle2';
import Register from "./routes/Register";
import Login from "./routes/Login";
import { StateProvider } from './components/StateProvider';
import reducer, { initialState } from './components/reducer';
import {CookiesProvider} from 'react-cookie'
import ListSurveyComponent from "./components/ListSurvey"
import IndividualSurveyComponent from './components/IndividualSurveyComponent';
import UserForm from './routes/UserForm'
import History from './routes/History'



function Router (){
  return(
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Login/>}/>
          <Route path = "/register" element={<Register/>}/>
          <Route path = "/company/*" element={<App/>}>
            <Route path="overview" element = {<CreateSurveyComponent/>}/>
            <Route path ="history" element = {<History company={true}/>}/>
            <Route path="create-survey/:id" element={<CreateForm call={false}/>}/>
            <Route path ="survey" element={<ListSurveyComponent company={true}/>}/>
            <Route path=":id" element={<IndividualSurveyComponent/>}/>
            
          </Route>
          <Route  path = "/user" element={<App/>}>
          <Route path="overview" element = {<CombinedComponent/>}/>
          <Route path="survey" element = {<ListSurveyComponent company={false}/>}/>
          <Route path=":id" element={<UserForm/>}/>
          <Route path="history" element={<History company={false}/>}/>

          </Route>
        </Routes>
      
    </BrowserRouter>
    </CookiesProvider>
    
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Router/>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
