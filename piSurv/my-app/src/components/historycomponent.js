import React, { useState } from 'react'
import HistoryBox from './historybox'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa'

function HistoryComponent({slides}) {
    const [current, setCurrent] = useState(0)
    const length = slides.length
    const prevSlide = () =>{
        setCurrent(current === 0 ? length - 1: current-1 )
        
    }
    const nextSlide = () =>{
        setCurrent(current === length -1 ? 0: current+1 )
        
    }

    console.log(current)

    if(!Array.isArray(slides) || slides.length <=0){
        return null;
    }
    
  return (
    <div className='flex flex-col justify-center items-center '>
        <p>History</p>
        <FaArrowAltCircleLeft className=' absolute mt-[10%] left-[32px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={prevSlide}/>
        <FaArrowAltCircleRight className='absolute mt-[10%] right-[32px] text-[3rem] text-black z-10 cursor-pointer select-none' onClick={nextSlide}/>
        <div className='md:hidden flex flex-row flex-nowrap justify-center max-w-md max-w-full w-[500px]  '>

        {
            slides.map((item,index)=>(
                <div className={index === current ? 'duration-1000 opacity-1 scale-105':'duration-1000 opacity-0 ease-in'}>
                    {index === current && (<HistoryBox key={index}/>)}
                </div>
                
            ))
        }
        </div>
        
        
      
    </div>
  )
}

export default HistoryComponent