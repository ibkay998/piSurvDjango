import React from 'react'

function HistoryBox(props) {
  return (
    <div className='flex flex-row shrink-0 w-[206px] bg-white border rounded-2xl h-[150px] pt-3'>
        <div className='ml-3'>
            <p className='text-2xl text-white capitalize leading-relaxed'>{props.name}</p>
            <h4 className='text-2xl mt-3'>{props.company}</h4>
            <h6 className='text-xl mt-4'>{props.amount}</h6>
        </div>
    </div>
  )
}

export default HistoryBox
