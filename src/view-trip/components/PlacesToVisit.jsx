import React from 'react';
import { FaMapMarked } from "react-icons/fa";
import { Button } from "@/components/ui/button"
const PlacesToVisit = ({ trip }) => {
  // Convert itinerary object to an array
  const itineraryArray = trip?.tripData?.itinerary 
    ? Object.entries(trip.tripData.itinerary) // Convert object to array
    : [];

  return (
    <div >
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div className="grid grid-cols-2">
        {itineraryArray.map(([day, details], index) => (
          <div key={index} className=" p-3 mt-2 gap-2">
            <h3>{day.toUpperCase()}</h3>
            <div className='border rounded-xl'>
            <div>
            <p>
              <strong className="font-bold">Best Time to Visit:</strong> {details.bestTimeToVisit}
            </p>
            <p>
              <strong>Theme:</strong> {details.theme}
            </p>
           </div>
            {/* Display activities and placeDetails */}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-1 ">
              <h4 className="font-semibold mb-1">Activities:</h4>
              {details.activities?.map((activity, idx) => (
                <div key={idx} className="ml-2 mb-1.5">
                  <p>
                    <strong>Place:</strong> {activity.placeDetails}
                  </p>
                  <p>
                    <strong>Rating:</strong> {activity.rating}
                  </p>
                  <div className='flex items-center justify-between'>
                   <img className='w-[170px] h-[170px] mb-1' src="/public/placeholder.jpg" alt="" />
                   <Button>
                   <FaMapMarked  />
                   </Button>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
