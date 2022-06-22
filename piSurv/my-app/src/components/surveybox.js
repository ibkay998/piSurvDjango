import React from 'react'

function SurveyBox(props) {
  return (
    <div className='flex flex-row shrink-0 w-[300px] bg-fuchsia-800 rounded-2xl h-[250px] pt-3'>
        <div className='item-start shrink-0 rounded-3xl w-[52px] h-[52px] bg-white  '>
            <img src={props.img}></img>
        </div>
        <div className='item-end ml-3'>
            <p className='text-[18px] text-white capitalize leading-relaxed font-bold '>{props.name}</p>
            <h4 className='text-[14px] text-white mt-4 uppercase font-thin'>{props.company}</h4>
            <h6 className='text-[18px] text-white mt-5'>{props.amount}</h6>
        </div>
    </div>
  )
}

export default SurveyBox
