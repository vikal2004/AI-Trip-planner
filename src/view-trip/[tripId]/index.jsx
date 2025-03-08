import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';
import { useState } from 'react';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
const Viewtrip = () => {
    const {tripId}=useParams();
    const [trip, setTrip]=useState([])
    useEffect(()=>{
      tripId&&GetTripData();
    },[tripId])
//  used to get data from firebase
    const GetTripData=async()=>{
        const docRef=doc(db, 'AITrips', tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("No Such Docuement");
            toast("No trip Found")
        }
    }

  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* information system */}
        <InfoSection trip={trip} />
        {/* Recommended hotel */}
          <Hotels trip={trip} />
        {/* Daily plan */}
        <PlacesToVisit trip={trip} />
        {/* Footer */}
         <Footer trip={trip} />
    </div>
  )
}

export default Viewtrip