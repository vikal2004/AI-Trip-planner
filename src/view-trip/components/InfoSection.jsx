import React, { useEffect } from 'react'
import { IoIosShareAlt } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { GetPlaceDetails } from '../../service/GlobalApi';
const InfoSection = ({trip}) => {
  useEffect(()=>{
    getPlacePhoto();
  },[trip])
  const getPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(res=>{
      console.log(res.data)
    })
  }
  return (
    <div>
        <img src="/placeholder1.jpg" className='h-[300px] w-full object-cover rounded-xl' alt="" />
          <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg '>🗓️ {trip?.userSelection?.noOfDays}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg '>💸 {trip?.userSelection?.budget}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-lg '>🧑‍🤝‍🧑 No of traveller :{trip?.userSelection?.traveller}</h2>
                </div>
            </div>
            <Button><IoIosShareAlt /></Button>
          </div>
    </div>
  )
}

export default InfoSection