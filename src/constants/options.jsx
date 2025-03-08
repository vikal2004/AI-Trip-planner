export const SelectTravelList=[
    {
        id: 1,
        title: "Just Me",
        desc: "A Sole Traveler in exploration",
        icon: "🧍",
        people: "1"
    },
    {
        id: 2,
        title: "Duo Adventure",
        desc: "Perfect for couples or best friends",
        icon: "👫",
        people: "2"
    },
    {
        id: 3,
        title: "Family Getaway",
        desc: "Explore the world with your loved ones",
        icon: "👨‍👩‍👧‍👦",
        people: "4"
    },
    {
        id: 4,
        title: "Squad Trip",
        desc: "A fun-packed journey with friends",
        icon: "🧑‍🤝‍🧑",
        people: "6"
    },
    {
        id: 5,
        title: "Corporate Retreat",
        desc: "Team bonding and relaxation together",
        icon: "🏢",
        people: "10"
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: "Cheap",
        desc: "Stay conscious of costs",
        icon: "💰"
    },
    {
        id: 2,
        title: "Standard",
        desc: "Balanced comfort and affordability",
        icon: "💵"
    },
    {
        id: 3,
        title: "Luxury",
        desc: "Premium experience with top-tier amenities",
        icon: "✨"
    }
];
 export const AI_PROMPT='Generate Travel Plan for Location :{location}, for {totalDays} Days for {traveller} with a {budget} budget, give me Hotels options list with HotelName, Hotel address , Price , hotel image url, geo coordinations , rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing , Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format'