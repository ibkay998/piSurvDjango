import React from 'react'
import SurveyList from './TopSurveyData'
import HistoryComponent from './historycomponent'
import NameCompnent from './namecomponet'
import SurveyComponent from './surveycomponent'
import HistoryList from './historyData'
import SideBar from './sidebar'

function Dashboard() {
  return (
    <div className='overflow-hidden'>
      <div className='flex flex-row h-screen w-screen '>
        <div className='hidden md:flex w-[334px] flex-shrink-0'>
          <SideBar/>
        </div>
        
        <div className='flex-flex-row w-full '>
          <NameCompnent />
          <SurveyComponent slides = {SurveyList}/>
          <HistoryComponent slides = {HistoryList}/>
        </div>

      </div>
        
    </div>
  )
}

export default Dashboard
