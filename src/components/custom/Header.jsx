import React, { useEffect } from 'react'
import {Button} from "@/components/ui/button"
import { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios';
const Header = () => {
 const[openDialog, setOpenDailog]=useState(false);
  const user=JSON.parse(localStorage.getItem('user')) || null;
  useEffect(()=>{
    console.log(user);
  },[])
  
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  const GetUserProfile=(tokenInfo)=>{
    console.log("hi from getuserprofile")
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp)
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDailog(false);
      window.location.reload();
    })
  }
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <img src="/logo.svg" alt="" />
        <div>
          {user ? <div className='flex items-center gap-5'>

            
            <a href="/create-trip">
            <Button variant="outline" className='rounded-full'>+ create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className='rounded-full'> My Trips</Button>
            </a>
               <Popover>
                  <PopoverTrigger>
                              <img className='h-[35px] w-[35px] rounded-full' src={user?.picture} alt="" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 onClick={()=>{
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}>Logout</h2>
                  </PopoverContent>
         </Popover>
          </div> : <Button onClick={()=>setOpenDailog(true)}>SignIn</Button>}
           
                <Dialog open={openDialog}>
                
             <DialogContent>
               <DialogHeader>
                 <DialogDescription>
                  <img src='/logo.svg' alt="" />
                  <h2 className='font-bold text-lg mt-7'>Sign In with Google</h2>
                  <p>Sign in to the App with Google authentication securily</p>
                  <Button 
                  onClick={login} className="w-full mt-2 flex gap-4 items-center">
                 <FcGoogle className='h-7 w-7' /> Sign In with Google
                 </Button>
                 </DialogDescription>
               </DialogHeader>
             </DialogContent>
           </Dialog>
           
           
        </div>
    </div>
  )
}

export default Header