import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../BookingWidget'
import PlaceGallery from '../PlaceGallery'
import AddressLink from '../AddressLink'

export default function PlacePage() {
	const { id } = useParams()
	const [place, setPlace] = useState(null)
	const [showAllPhotos, setShowAllPhotos] = useState(false)

	useEffect(() => {
		if (!id) {
			return
		}
		axios.get('/places/' + id).then(res => {
			setPlace(res.data)
		})
	}, [id])

	if (!place) return '';

	return (
		<div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
			<h1 className='text-3xl'>{place.title}</h1>

			<AddressLink children={place.address} />

			<PlaceGallery place={place} />

			<div className='grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-8'>
				<div className='flex flex-col gap-8'>
					<div>
						<h2 className='font-semibold text-2xl'>Description</h2>
						{place.description}
					</div>
					<div className='font-medium text-md'>
						Check-in: {place.checkIn}:00 <br />
						Check-out: {place.checkOut}:00 <br />
						Max guests: {place.maxGuests} <br />

					</div>
				</div>
				<div>
					<BookingWidget place={place} />
				</div>
			</div>

			<div className='mt-8'>
				<h2 className='font-semibold text-2xl'>Extra Information</h2>
				<div className='text-md text-gray-800 leading-5 my-2'>
					{place.extraInfo}
				</div>
			</div>
		</div>
	)
}
