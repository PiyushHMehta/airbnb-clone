import React from 'react'
import { differenceInCalendarDays, format } from 'date-fns'

export default function BookingDates({booking}) {
    return (
        <div>
            <div className='border-t border-gray-300 my-2 pt-2'>
                <div className='flex gap-1'>
                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                            <path d="M14 2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V6h12v8zm-3-5h-2V7h2v2z" />
                        </svg>
                        {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                    </div>
                    &rarr;
                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
                            <path d="M14 2H2c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H2V6h12v8zm-3-5h-2V7h2v2z" />
                        </svg>
                        {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                    </div>
                </div>
            </div>
        </div>
    )
}
