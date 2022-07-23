import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {Link} from "react-router-dom"

function SideBar() {
    const navigate = useNavigate()
    
     
   
    
    const menu = [
        "overview",
        "survey",
        "history",
        "settings",
    ]
  return (
    <div className='hidden md:flex flex-col flex-grow h-full  flex-shrink-0 border-r-4 border-gray-200'  >
      <div className='flex flex-col justify-center items-center h-3/5 w-full bg-white'>
        <div className='item-start shrink-0 rounded-3xl w-[100px] h-[100px] bg-black '>
        </div>
        <span className=''>Oyeniyi Ibukunoluwa</span>
        <text className=''>Survey Taker</text>
      </div>
      <div className='flex flex-col justify-start items-center h-2/3 w-full bg-white'>
        <ul className='flex flex-col w-full  items-center '>
            {menu.map((items,index)=>(
                <Link to={items} key={index} className='flex uppercase w-full text-lg items-center justify-center text-black hover:text-white hover:bg-fuchsia-700 py-[18px] text-[20px] mt-[10px]'>{items}</Link>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
