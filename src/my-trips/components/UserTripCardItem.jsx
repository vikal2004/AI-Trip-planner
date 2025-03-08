import React from 'react'

const UserTripCardItem = ({trip}) => {
    console.log("tripdata",trip.tripData);
  return (
    <div>
        <img className="object-cover rounded-xl" src="/public/placeholder.jpg" alt="" />
        <div>
            <h2 className='font-bold text-lg'>{trip?.tripData?.location}</h2>
            <h2 className=''>{trip?.tripData?.budget}</h2>
            <h2 className=''>{trip?.tripData?.travelers}</h2>
            <h2 className=''>{trip?.tripData?.tripName}</h2>
        </div>
    </div>
  )
}

export default UserTripCardItem