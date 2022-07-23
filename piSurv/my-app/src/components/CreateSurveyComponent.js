import React, { useEffect,useState } from 'react'
import NameCompnent from './namecomponet'
import { Link} from "react-router-dom"
import uuid from "react-uuid"
import { useNavigate} from "react-router-dom"
import {useCookie, useCookies} from 'react-cookie'
import ApiService from '../routes/ApiService'
import SurveyList from './TopSurveyData'
import SurveyComponent from './surveycomponent'


function CreateSurveyComponent() {
    const navigate = useNavigate()
    const [token,setToken] = useCookies(["mytoken"])
    const [isAvailable,setIsAvailable] = useState(false)
    const [available,setAvailable] = useState([])
    

    useEffect(() => {
      ApiService.FetchSurveyData(token["mytoken"]).then((result) => {
          
          if (result.length > 0){
            setIsAvailable(true)
            let store = [] 
            
            setAvailable(Object.values(result))
          }   
        })      
  
    }, [token]);
    const CreateForm = () =>{
        const id = uuid()
        navigate("/company/create-survey/"+id)
    }
  return (
    <div>{!isAvailable ? (
      <div className='flex flex-col justify-center items-center'>
      <NameCompnent/>
      <div className='mt-[100px] w-[60%] border-8 border-dashed  bg-white h-[400px] flex justify-center items-center'>
      {/* <Link to={`/company/create-survey`}> */}
      <button onClick={CreateForm} className='flex flex-col items-center text-2xl hover:bg-gray-200 h-[100px] hover:cursor-pointer hover:transition'>
              <p className=''> + </p>
              <p className='text-[70px] text-gray-300'>Create Survey</p>
      </button>
          
        {/* </Link> */}
          
      </div>
    </div>
      ):(
        <div className="flex flex-col mt-[100px] justify-center items-center gap-2 ">
          <div className='flex'>
            <SurveyComponent slides = {available.reverse().slice(0,3)} company = {true}/>
          </div>
          <div className="flex justify-center items-center border-8 border-dashed flex-col h-[100%]">
            <button onClick={CreateForm} className='flex flex-col items-center text-2xl hover:bg-gray-200 h-[100px] hover:cursor-pointer hover:transition'>
                <p className=''> + </p>
                <p className='text-[70px] text-gray-300'>Create Survey</p>
            </button>
          </div>
              
        </div>
        
      )
      
      }</div>
    
  

    
  )
}

export default CreateSurveyComponent
