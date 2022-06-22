import React from 'react'

function HistoryBox(props) {
  console.log(props)
  return (
    <div className='flex flex-row shrink-0 w-[206px] bg-white border rounded-2xl h-[150px] pt-3'>
        <div className='ml-3'>
            <p className='text-[14px] text-black capitalize mt-3 leading-relaxed'>{props.name}</p>
            <div>{props.completed === "True" ? <div>Completed True</div> : <div> Completed False</div>}</div>
            
            
        </div>
    </div>
  )
}

export default HistoryBox
