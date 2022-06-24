import React from 'react'

function SideBar() {
    const menu = [
        "overview",
        "survey",
        "history",
        "settings",
    ]
  return (
    <div className='hidden md:flex flex-col flex-grow h-full  flex-shrink-0'  >
      <div className='flex flex-row justify-center items-center h-3/5 w-full bg-slate-400'>
        <div className='item-start shrink-0 rounded-3xl w-[100px] h-[100px] bg-black '>
                
        </div>
      </div>
      <div className='flex flex-col justify-center items-center h-2/3 w-full bg-slate-800'>
        <ul className='flex flex-col w-full justify-center items-center '>
            {menu.map((items)=>(
                <div className='flex uppercase w-full text-lg items-center justify-center text-white bg-purple-300 h-[30px] mt-[20px]'>{items}</div>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
