import { useEffect, useState } from "react"
import React from 'react'
import Perks from '../Perks'
import axios from 'axios'
import PhotosUploader from '../PhotosUploader'
import AccountNav from "../AccountNav"
import { Navigate, useParams } from "react-router-dom"

export default function PlacesFormPage() {
    const { id } = useParams()
    // console.log({ id });

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then(res => {
            const { data } = res
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })

    }, [id])

    function inputHeader(text) {
        return <h2 className='text-2xl mt-4'>{text}</h2>
    }

    function inputDesc(text) {
        return <small className='text-gray-500 text-sm block'>{text}</small>
    }

    function preInput(header, desc) {
        return (
            <>
                {inputHeader(header)}
                {inputDesc(desc)}
            </>
        )
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price }
        if (id) {
            // update
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            // add new place
            await axios.post('/places', placeData);
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place should be short and catchy for advertisement')}
                <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder='Title, for ex: My lovely apt' />

                {preInput('Address', 'Address to your place')}
                <input type='text' value={address} onChange={ev => setAddress(ev.target.value)} placeholder='Address' />

                {preInput('Photos', 'More the merrier')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of the place')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                {preInput('Perks', 'Select all the perks of your place')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2 mb-4'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra information', 'About the space')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check-in & out time, max guests', 'Add check-in and out times, remeber to have some time window for room cleaning')}
                <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check-in time</h3>
                        <input type="number" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder='11' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check-out time</h3>
                        <input type="number" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder='09' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder='2' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder='2' />
                    </div>
                </div>



                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}
