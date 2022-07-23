import React,{useState,useEffect} from 'react'
import HistoryComponent from './historycomponent'
import NameCompnent from './namecomponet'
import SurveyComponent from './surveycomponent'
import HistoryList from './historyData'
import SurveyList from './TopSurveyData'
import { BrowserRouter,Routes,Router,Switch,Route} from "react-router-dom"
import { useNavigate} from "react-router-dom"
import {useCookie, useCookies} from 'react-cookie'
import ApiService from '../routes/ApiService'



function CombinedComponent() {
    const navigate = useNavigate()
    const [token,setToken] = useCookies(["mytoken"])
    const [isAvailable,setIsAvailable] = useState(false)
    const [available,setAvailable] = useState([])
    

    useEffect(() => {
      ApiService.FetchAllSurvey(token["mytoken"]).then((result) => {
          if (result.length > 0){
            setIsAvailable(true)
            setAvailable(Object.values(result))
          }   
        })      
  
    }, []);

  return (
      <div className=''>
        <NameCompnent/>
        <SurveyComponent slides={available.reverse().slice(0,3)} company = {false}/>
        <HistoryComponent slides={HistoryList}/>
      </div>
        
    
  )
}

export default CombinedComponent
