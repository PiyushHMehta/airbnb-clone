import React, { useState, useEffect } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from 'react-router-dom'
import BookingDates from '../BookingDates'

export default function BookingsPage() {
	const [bookings, setBookings] = useState([])
	useEffect(() => {
		axios.get('/bookings').then(res => {
			setBookings(res.data)
		})
	}, [])

	return (
		<div>
			<AccountNav />
			<div className=''>
				{bookings?.length > 0 && bookings.map(booking => (
					<Link to={'/account/bookings/'+booking._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden p-2 my-4'>
						<div className='w-48'>
							<PlaceImg place={booking.place} />
						</div>
						<div className='py-2 grow pr-4'>
							<h2 className='text-xl'>{booking.place.title}</h2>
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

					</Link>
				))}
			</div>
		</div>
	)
}
