import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '../constants/options'
import { toast } from 'sonner'
import { chatSession } from '../AIModal'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../service/firebaseConfig'
import { useNavigate } from 'react-router-dom'
const CreateTrip = () => {

    console.log(import.meta.env.VITE_GOOGLE_PLACE_API_KEY)

    const[place, setPlace]=useState();
    const [formData , setFormData]=useState([]);
    const[openDialog, setOpenDailog]=useState(false);
   const[loading, setLoading]=useState(false);
   const navigate=useNavigate();

    const handleInputChange=(name, value)=>{
        if(name=='noOfDays'&&value>5){
            console.log("please enter Trip  Days less than 9")
            return;
        }
     setFormData({
        ...formData,
        [name]:value
     })
    }

    useEffect(()=>{
     console.log(formData)
    },[formData])

    const login=useGoogleLogin({
      onSuccess:(codeResp)=>GetUserProfile(codeResp),
      onError:(error)=>console.log(error)
    })

    const onGenerateTrip=async()=>{
    
      const user=localStorage.getItem('user');

      if(!user){
       setOpenDailog(true);
        return ;
      }
        if(formData?.noOfDays>5&&!formData?.location || !formData?.budget || !formData?.traveller){
            toast("please fill all the details")
            return;
        }
        setLoading(true)
      const FINAL_PROMPT=AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}',formData?.budget)
      .replace('{totalDays}',formData?.noOfDays)

      // console.log(FINAL_PROMPT);
      const result=await chatSession.sendMessage(FINAL_PROMPT)
      console.log(result?.response?.text())
      setLoading(false)
      SaveAiTrip(result?.response?.text())
    }

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
        onGenerateTrip();
      })
    }

    const SaveAiTrip=async(TripData)=>{
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const docId = Date.now().toString(); // Unique ID for the document
    
        // Add a new document in the "AITrips" collection
        await setDoc(doc(db, "AITrips", docId), {
          userSelection: formData,
          tripData: JSON.parse(TripData),
          userEmail: user?.email || "unknown", // Avoid potential undefined issues
          id: docId,
        });
    
        setLoading(false);
        console.log("Trip saved successfully!");
        navigate('/view-trip/'+docId)
      } catch (error) {
        setLoading(false);
        console.error("Error saving trip:", error);
      }
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell Us your travel preferences🏝️</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic informatin , and our trip planner will generae a customized itinerary based your preferences</p>
    
    <div className='mt-20 flex flex-col gap-10'>
        <div>
            <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
             <GooglePlacesAutocomplete 
             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
             selectProps={{
                place,
                onChange:(v)=>{setPlace(v); handleInputChange('location', v)}
             }}
              />
        </div>
        <div>
      <h2 className='text-xl my-3 font-medium'>How many days are you planning for trip</h2>
      <Input placeholder={"Ex.3"} type="number" onChange={(e)=>handleInputChange('noOfDays', e.target.value)}/>
      </div>
    </div>
      
      <div>
      <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectBudgetOptions.map((item, index)=>(
            <div key={index} onClick={()=>handleInputChange('budget', item.title)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title&&'shadow-md border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
        ))}
      </div>
      </div>

      <div>
      <h2 className='text-xl my-3 font-medium'>who do you plan on traveling with ?</h2>
      <div className='grid grid-cols-3 gap-5 mt-5'>
        {SelectTravelList.map((item, index)=>(
            <div key={index} onClick={()=>handleInputChange("traveller",item.people)} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.traveller==item.people&&'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
        ))}
      </div>
      </div>
     <div className='my-10 justify-end flex'>
     <Button  onClick={onGenerateTrip}>{ loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />  : "Generate Trip"}</Button>
     </div>

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
  )
}

export default CreateTrip