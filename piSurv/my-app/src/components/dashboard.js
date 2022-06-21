import React from 'react'
import SurveyList from './TopSurveyData'
import HistoryComponent from './historycomponent'
import NameCompnent from './namecomponet'
import SurveyComponent from './surveycomponent'
import HistoryList from './historyData'

function Dashboard() {
  return (
    <div className=''>
        <NameCompnent />
        <SurveyComponent slides = {SurveyList}/>
        <HistoryComponent slides = {HistoryList}/>
    </div>
  )
}

export default Dashboard
