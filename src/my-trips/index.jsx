import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {  useNavigation } from 'react-router-dom';
import { db } from '../service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';
const MyTrips = () => {
    const navigation=useNavigation();
    const [userTrips, setUserTrips]=useState([]);
     useEffect(() => {
      GetUserTrips();
     }, [])
     
    //  use to get all user trip
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(!user){
           navigation('/');
           return;
        }
         setUserTrips([]);
        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUserTrips(preVal=>[...preVal, doc.data()])
        })
    }
    console.log(userTrips);
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>My Trips</h2>

        <div className='grid grid-cols-2 mt-2 md:grid-cols-3 gap-5 '>
            {userTrips.map((trip, index)=>(
                <UserTripCardItem trip={trip}  />
            ))}
        </div>

    </div>
  )
}

export default MyTrips