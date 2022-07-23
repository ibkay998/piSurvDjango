import React, {useState } from 'react'
import SurveyBox from './surveybox'
import {Link} from "react-router-dom"
import { useLocation } from 'react-router-dom'


import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'

function SurveyComponent(props) {
    const location = useLocation()
    const [current, setCurrent] = useState(0)
    const length  =  props.slides.length
    const lista = []
    
    console.log(location)
    const prevSlide = () =>{
        setCurrent(current === 0 ? length - 1: current-1 )  
    }
    const nextSlide = () =>{
        setCurrent(current === length -1 ? 0: current+1 )
    }

    if(!Array.isArray(props.slides) || props.slides.length <=0){
        return null;
    }

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
        <div>{!props.company ?(<p>Here is a List of top surveys for you</p>):(<p>This is a list of your surveys</p>)}</div>
        
        <div className='md:hidden flex flex-row justify-center w-[400px]  h-[40vh] items-center' >
            <FaArrowAltCircleLeft className='  absolute mt-[5%] left-[15px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={prevSlide}/>
            <FaArrowAltCircleRight className=' absolute mt-[5%] right-[15px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={nextSlide}/>
            {
                props.slides.map((item,index)=>(
                    <div className={index === current ? 'duration-1000 opacity-1 scale-105':'duration-1000 opacity-0 ease-in'}>
                        {index === current && (<SurveyBox  key = {item.id} name={item.title}  description={item.description} amount="5" ></SurveyBox>)}
                    </div>
                    
                ))
            }   
        </div>
        <div className='md:flex hidden flex-row gap-2  flex-wrap w-full h-[324px] items-center'>
            {!props.company ? (
                props.slides.map((item,index)=>(
                   
                        <Link to={`/user/${item.id}`}><SurveyBox  key = {item.id} name={item.title}  description={item.description} amount="5"></SurveyBox></Link>
                    
                    
                ))):(props.slides.map((item,index)=>(
                   
                    <Link to={`/company/${item.id}`}><SurveyBox  key = {item.id} name={item.title}  description={item.description} amount="5"></SurveyBox></Link>
            )))
            }   
        </div>

        

        
        
      
    </div>
  )
}

export default SurveyComponent
