import React from 'react'

export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return ''
    }
    if (!className) {
        className = 'rounded-xl transform w-[150%] h-[150%] object-cover overflow-hidden'
    }

    return (
        <div>
            <img className={className} src={'http://localhost:4000/uploads/' + place.photos[index]} alt="" />
        </div>
    )
}
