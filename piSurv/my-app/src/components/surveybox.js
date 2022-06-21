import React from 'react'

function SurveyBox(props) {
  return (
    <div className=' flex flex-row shrink-0 w-[334px] bg-fuchsia-800 rounded-2xl h-[250px]  pt-3'>
        <div className='item-start shrink-0 rounded-2xl w-[52px] h-[52px] bg-white  '>
            <img src={props.img}></img>
        </div>
        <div className='item-end ml-3'>
            <p className='text-2xl text-white capitalize leading-relaxed'>{props.name}</p>
            <h4 className='text-2xl mt-3'>{props.company}</h4>
            <h6 className='text-xl mt-4'>{props.amount}</h6>
        </div>
    </div>
  )
}

export default SurveyBox
