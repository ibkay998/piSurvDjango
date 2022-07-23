import React from 'react'
import NameCompnent from './namecomponet'
import SurveyComponent from './surveycomponent'
import HistoryComponent from './historycomponent'
import SurveyList from './TopSurveyData'
import HistoryList from './historyData'
import { Link } from "react-router-dom";

function Test() {
  return (
    <div>
       <NameCompnent />
          <SurveyComponent slides = {SurveyList}/>
          <HistoryComponent slides = {HistoryList}/>
          <Link to='/main' className="text-gray-800 hover:text-gray-400 duration-500"></Link>
    </div>
  )
}

export default Test
