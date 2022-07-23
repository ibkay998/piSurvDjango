import React from 'react'

function Wordle2() {


  let tests = ["Values","","","","",""]
  return (

      <div className='flex flex-col h-[400px] justify-center items-center width-[300px]'>
        {tests.map((test,i)=>(
            <Line className=""guess={test} key={i}/>
        ))}

      </div>
    
    
    
  )
}

function Line( {guess} ){
    const store=[]
    for (let i =0;i < 5;i++){
        const char = guess[i]
        let className = "tile"
        store.push(<div className={`${className} w-[40px] h-[40px] border shadow-md text-24px uppercase flex justify-center items-center`} key={i}>{char}</div>)
    }
    
    
    
    return(
        <div className='flex gap-4'>
            {store}
        </div>
    )    
}

export default Wordle2
