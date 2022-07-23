import React, { useEffect,useState } from 'react'
import NameCompnent from './namecomponet'
import { Link} from "react-router-dom"
import uuid from "react-uuid"
import { useNavigate} from "react-router-dom"
import {useCookie, useCookies} from 'react-cookie'
import ApiService from '../routes/ApiService'
import SurveyList from './TopSurveyData'
import SurveyComponent from './surveycomponent'


function ListSurveyComponent(props) {
    const navigate = useNavigate()
    const [token,setToken] = useCookies(["mytoken"])
    const [isAvailable,setIsAvailable] = useState(false)
    const [available,setAvailable] = useState([])
    

    useEffect(() => {
      
      if (props.company){
        ApiService.FetchSurveyData(token["mytoken"]).then((result) => {
          
          if (result.length > 0){
            setIsAvailable(true) 
            setAvailable(Object.values(result))
          }   
        })
      }
      else{
        ApiService.FetchAllSurvey(token["mytoken"]).then((result) => {
          if (result.length > 0){
            setIsAvailable(true)
            setAvailable(Object.values(result))
          }   
        })  
      }

            
  
    }, [token,props.survey]);
    
  return (
    <div>{!isAvailable ? (
      <div>
          <p>No surveys</p>
        </div>
      ):(
     
          <div className='flex flex-col mt-[100px] justify-center items-center gap-2'>
            <SurveyComponent slides = {available} company = {true ? props.company:false}/>
          </div>    
        
      )
      }</div>
    
  

    
  )
}

export default ListSurveyComponent
