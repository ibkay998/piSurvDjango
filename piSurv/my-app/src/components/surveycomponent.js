import React, {useState } from 'react'
import SurveyBox from './surveybox'

import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'

function SurveyComponent(props) {
    const [current, setCurrent] = useState(0)
    const length = props.slides.length
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
    <div className='flex flex-col justify-center items-center '>
        <p>Here is a List of top surveys for you</p>
        
        <div className='md:hidden flex flex-row justify-center w-[400px]  h-[40vh] items-center' >
            <FaArrowAltCircleLeft className='  absolute mt-[5%] left-[15px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={prevSlide}/>
            <FaArrowAltCircleRight className=' absolute mt-[5%] right-[15px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={nextSlide}/>
            {
                props.slides.map((item,index)=>(
                    <div className={index === current ? 'duration-1000 opacity-1 scale-105':'duration-1000 opacity-0 ease-in'}>
                        {index === current && (<SurveyBox  key = {index} name={item.name} image={item.image} company={item.company} amount={item.amount} ></SurveyBox>)}
                    </div>
                    
                ))
            }   
        </div>
        <div className='md:flex hidden flex-row justify-between w-full  h-[324px] items-center'>
            {
                props.slides.map((item,index)=>(
                    <div >
                        <SurveyBox  key = {index} name={item.name} image={item.image} company={item.company} amount={item.amount} ></SurveyBox>
                    </div>
                    
                ))
            }   
        </div>

        

        
        
      
    </div>
  )
}

export default SurveyComponent
