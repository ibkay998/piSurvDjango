import React from 'react'

function NameCompnent() {
    
  return (
    <div className='  md:flex flex-wrap flex md:flex-row flex-col items-center justify-between w-full mt-28 font-[Roboto] text-xl text-gray-700  
    '>
        <div className='md:ml-6 md:justify-start font-bold'>
            <h1 className='md:text-3xl text-2xl '>Welcome John</h1>
        </div>
      
        <div className='md:mr-6 md:justify-end text-sm mt-4 md:mt-2'>
            <p >Total Surveys Taken</p>
            <p>Amount of pi earned</p>
        </div>
      
    </div>
  )
}

export default NameCompnent
