import React from 'react'
import {Button} from "@/components/ui/button"
import { Link } from 'react-router-dom'
const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[60px] text-center mt-16'>
            <span className='text-[#f56551]'>Discover Your Next Adventure with AI.</span> Personilized Itinerites At your fingertips.
            </h1>
     <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator creating custom itineraries taiored to your intrests and budgets</p>
     <Link to={"/create-trip"}>
    <Button>Get Started ,it's free</Button>
    </Link>

    <img src="/landingpage.jpg" alt="" className='p-6' />
    </div>
  )
}

export default Hero