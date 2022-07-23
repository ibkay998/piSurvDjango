import React, { useEffect,useState } from 'react'

import { Link} from "react-router-dom"
import uuid from "react-uuid"
import { useNavigate} from "react-router-dom"
import {useCookie, useCookies} from 'react-cookie'
import ApiService from '../routes/ApiService'
import SurveyComponent from '../components/surveycomponent'


function History(props) {
    const navigate = useNavigate()
    const [token,setToken] = useCookies(["mytoken"])
    const [isAvailable,setIsAvailable] = useState(false)
    const [available,setAvailable] = useState([])
    

    useEffect(() => {
      
      
        ApiService.FetchHistoryData(token["mytoken"]).then((result) => {
          
          if (result.length > 0){
            setIsAvailable(true) 
            setAvailable(Object.values(result))
            console.log(result)
          }  
          else{
            setIsAvailable(false) }
        })      
      }

    , [token]);
    
  return (
    <div>{!isAvailable ? (
      <div>
          <p>No surveys Filled</p>
        </div>
      ):(
     
          <div className='flex flex-col mt-[100px] justify-center items-center gap-2'>
            <SurveyComponent slides = {available} company = {true ? props.company:false}/>
          </div>    
        
      )
      }</div>
    
  

    
  )
}

export default History
