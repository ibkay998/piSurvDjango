import React, { useState } from 'react'
import HistoryBox from './historybox'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft,} from 'react-icons/fa'



function HistoryComponent(props) {
    const [current, setCurrent] = useState(0)
    const length = props.slides.length
    const prevSlide = () =>{
        setCurrent(current === 0 ? length - 1: current-1 )
        
    }
    const nextSlide = () =>{
        setCurrent(current === length -1 ? 0: current+1 )
        
    }
    console.log(current)

    if(!Array.isArray(props.slides) || props.slides.length <=0){
        return null;
    }
    
  return (
    <div className='flex flex-col justify-center items-center '>
        <p>History</p>
        
        <div className='md:hidden flex flex-row flex-nowrap justify-center max-w-md max-w-full w-[500px]  '>
        <FaArrowAltCircleLeft className=' absolute mt-[10%] left-[32px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={prevSlide}/>
        <FaArrowAltCircleRight className='absolute mt-[10%] right-[32px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={nextSlide}/>

        {
            props.slides.map((item,index)=>(
                <div className={index === current ? 'duration-1000 opacity-1 scale-105':'duration-1000 opacity-0 ease-in'}>
                    {index === current && (<HistoryBox key={index} name={item.name} completed={item.completed}/>)}
                </div>
                
            ))
        }
        </div>
        <div className='hidden md:flex flex-row flex-nowrap justify-between  max-w-full w-full  '>

        {
            props.slides.map((item,index)=>(
                <div>
                    <HistoryBox key={index} name={item.name} completed={item.completed}/>
                </div>
                
            ))
        }
        </div>
        
        
      
    </div>
  )
}

export default HistoryComponent