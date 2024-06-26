import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function IndexPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/places').then(res => {
            setPlaces(res.data)
        })
    }, [])
    return (
        <div className="mt-8 grid gap-8 gap-row-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && (
                places.map(place => (
                    <Link to={'/place/' + place._id} className="mb-2">
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
                            )}
                        </div>
                        <h2 className="text-md font-semibold truncate">{place.title}</h2>
                        <h3 className="text-md text-gray-500">{place.address}</h3>
                        <h3 className="text-md font-light"><span className="text-md font-semibold">₹{place.price}</span> night</h3>
                    </Link>
                ))
            )}
        </div>
    )
}