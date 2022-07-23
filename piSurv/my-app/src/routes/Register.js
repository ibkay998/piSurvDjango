import React,{useState,useEffect} from 'react'
import ApiService from './ApiService'
import {useCookie, useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

function Register() {
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")
    const [token,setToken] = useCookies(["mytoken"])
    let history = useNavigate()

    useEffect(()=>{
        if (token["mytoken"]){
            history("/company/overview")
        }
    },[token])

    const loginBtn = ()=>{
        ApiService.LoginUser({username,password})
        .then(resp => setToken("mytoken",resp.token)).then(resp=>console.log(resp))
        .catch(err => console.log(err))
    }

    const registerBtn = ()=>{
        ApiService.RegisterUser({username,password})
        .then(resp => loginBtn())
        .catch(err => console.log(err))
    }

  return (
    <div id="wrapper" class="flex flex-col justify-between h-screen">
      
        <div class="bg-white py-4 shadow dark:bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="flex items-center lg:justify-between justify-around">
                    <a href="trending.html">
                        <b><h1>Social Book</h1></b>
                    </a>
                    <div class="capitalize flex font-semibold hidden lg:block my-2 space-x-3 text-center text-sm">
                        <a href="/login" class="bg-pink-500 pink-500 px-6 py-3 rounded-md shadow text-white">Login</a>
                    </div>
                </div>
            </div>
        </div>

      

        <div>
            <div class="lg:p-12 max-w-md max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                <h1 class="lg:text-3xl text-xl font-semibold mb-6"> Sign Up</h1>
                <p class="mb-2 text-black text-lg"> Register to manage your account </p>
                

                <div id ="message_container"> 
                    
                </div>
                
                
                
                   
                   
                <input type="text" name="username" placeholder="Username" value={username}  onChange={e => setUsername(e.target.value)} class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800" className="border "/>
                <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} class="bg-gray-200 mb-2 shadow-none dark:bg-gray-800" className="border "/>
                    
                    <div class="flex justify-start my-4 space-x-1">
                        <div class="checkbox">
                            <input type="checkbox" id="chekcbox1" checked/>
                            <label for="chekcbox1"><span class="checkbox-icon"></span> I Agree</label>
                        </div>
                        <a href="/"> Terms and Conditions</a>
                    </div> 
                    <button onClick={registerBtn} className="bg-gradient-to-br from-pink-500 py-3 rounded-md text-white text-xl to-red-400 w-full">Sign Up</button>
                    <div class="text-center mt-5 space-x-2">
                        <p class="text-base"> Do you have an account? <a href="/login"> Login </a></p>
                    </div>



            </div>
        </div>
        
       

        <div class="lg:mb-5 py-3 uk-link-reset">
            <div class="flex flex-col items-center justify-between lg:flex-row max-w-6xl mx-auto lg:space-y-0 space-y-3">
                <div class="flex space-x-2 text-gray-700 uppercase">
                    <a href="/"> About</a>
                    <a href="/"> Help</a>
                    <a href="/"> Terms</a>
                    <a href="/"> Privacy</a>
                </div>
                <p class="capitalize"> © copyright 2020 by socol</p>
            </div>
        </div>

    </div>
  )
}

export default Register
