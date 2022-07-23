import { useState } from "react"
import { Outlet, Link } from "react-router-dom";
import {useCookie, useCookies} from 'react-cookie'
import ApiService from "../routes/ApiService";



function Header(){
    
    
    const Logout=()=>{
        ApiService.LogoutUser()
        console.log("you have been logged out")
    }

    let Links =[
        {name:"OVERVIEW",link:"overview"},
        {name:"SURVEYS",link:"surveys"},
        {name:"LOGOUT",link:"logout"},
        
        
    ] 

    let [open,setOpen] = useState(false)
    return(
        <div className="shadow-md w-full fixed top-0 left-0" >
            <div className="md:flex items-center justify-between bg-white py-4 border-black text-blue-400 md:px-10 px-7">
                <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
                    <span className="text-3xl text-pink-600 mr-1 pt-2">
                        <ion-icon name="logo-ionic"></ion-icon>
                    </span>
                    Pisurv
                </div>
                <div onClick={()=>setOpen(!open)} className="3xl absolute right-8 top-6 cursor-pointer md:hidden">
                    <ion-icon name={open ? "close":"menu"}></ion-icon>
                </div>
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static 
                bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all
                 duration-500 ease-in ${open ? "top-20 opacity-100" : "top-[-490px] md:opacity-100 opacity-0"} `}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                                <Link to={`/${link.link}`} className="text-gray-800 hover:text-gray-400 duration-500">{link.name}</Link>
                            </li>
                        ))
                    }
                    <button onClick={Logout} >Logout</button>
                </ul>
                
                
            </div>

           </div>
    )
}

export default Header