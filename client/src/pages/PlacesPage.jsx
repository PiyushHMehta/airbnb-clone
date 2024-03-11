import { Link } from 'react-router-dom'
import AccountNav from '../AccountNav'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg';

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div className='text-center'>
                {/* list of all added places */}
                <br />

                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full ' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
                <div className='mt-4'>
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/' + place._id} className='bg-gray-100 p-4 rounded-xl mt-2 flex gap-4 cursor-pointer' key={place.title}>
                            <div className='flex bg-gray-300 rounded-xl grow-1 shrink-0'>
                                {/* <PlaceImg place={place} /> */}
                                <div>
                                    <img className=' w-32 h-32 object-cover rounded-xl ' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                                </div>
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-sm mt-2'>{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
