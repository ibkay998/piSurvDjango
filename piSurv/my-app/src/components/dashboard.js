import React from 'react'
import SurveyList from './TopSurveyData'
import CombinedComponent from './CombinedComponent';
import Surveys from '../routes/Surveys';
import SideBar from './sidebar'
import { Outlet,Link } from "react-router-dom";
import { BrowserRouter,Routes,Router,Switch,
  Route,} from "react-router-dom";
import CompanySurveys from '../routes/CompanySurveys';

function Dashboard() {
  return (
    <div className='overflow-hidden'>
      <div className='flex flex-row h-screen w-screen '>
        <div className='hidden md:flex w-[334px] flex-shrink-0 ' >
          <SideBar/>
        </div>
        
        <div className='flex-flex-row w-full overflow-scroll'>
        
          <Routes>
              <Route
                    path="surveys"
                    element={<CompanySurveys/>}
                  />
          </Routes>
        <Outlet/>
         
        </div>

      </div>
        
    </div>
  )
}

export default Dashboard
