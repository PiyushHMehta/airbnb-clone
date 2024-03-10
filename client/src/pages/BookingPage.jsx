import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddressLink from '../AddressLink'
import PlaceGallery from '../PlaceGallery'
import BookingDates from '../BookingDates'
import { differenceInCalendarDays } from 'date-fns'

export default function BookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(res => {
                const foundBooking = res.data.find(({ _id }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [id])

    if (!booking) {
        return ''
    }

    return (
        <div className='my-8'>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
                <h2>Your booking information</h2>
                <BookingDates booking={booking} />
                <div className='flex gap-1 my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
                </div>
                <div className='flex gap-1 my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Total price: ₹{booking.price}
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}
