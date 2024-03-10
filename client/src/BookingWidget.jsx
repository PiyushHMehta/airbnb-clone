import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numOfGuests, setNumOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])

    let numOfNights = 0
    if (checkIn && checkOut) {
        numOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numOfGuests, name, phone, place: place._id, price: numOfNights * place.price
        })
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <div className='bg-white shadow p-8 rounded-2xl'>
                <div className='font-light text-gray-900'>
                    <span className='font-semibold text-2xl text-black'>₹{place.price}</span>
                    night
                </div>
                <div className='border rounded-2xl mt-4'>
                    <div className='flex'>
                        <div className=' p-4 border-r'>
                            <label>Check in: </label>
                            <input type="date" value={checkIn} onChange={(ev) => setCheckIn(ev.target.value)} />
                        </div>
                        <div className='p-4 '>
                            <label>Check out: </label>
                            <input type="date" value={checkOut} onChange={(ev) => setCheckOut(ev.target.value)} />
                        </div>
                    </div>
                    <div className='p-4 border-t'>
                        <label>Number of guests:</label>
                        <input type="number" value={numOfGuests} onChange={(ev) => setNumOfGuests(ev.target.value)} />
                    </div>
                    {numOfNights > 0 && (
                        <div className='p-4 border-t'>
                            <label>Your full name:</label>
                            <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                            <label>Your contact number:</label>
                            <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        </div>
                    )}
                </div>
                <button onClick={bookThisPlace} className="primary mt-4 flex gap-2 justify-center items-center">
                    Reserve
                    {numOfNights > 0 && (
                        <span>
                            ₹{numOfNights * place.price}
                        </span>
                    )}
                </button>
            </div>
        </div>
    )
}
