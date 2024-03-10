import React from 'react'

export default function Perks({selected, onChange}) {
    function handleCbClick(ev) {
        const {checked, name} = ev.target
        if(checked) {
            onChange([...selected, name])            
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }
    }
    return (
        <>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('wifi')} name='wifi' onChange={handleCbClick}  />
                📶
                <span>Wifi</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('parking')} name='parking' onChange={handleCbClick} />
                🚗
                <span>Free Parking</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('tv')} name='tv' onChange={handleCbClick} />
                📺
                <span>TV</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('pets')} name='pets' onChange={handleCbClick} />
                🐈
                <span>Pets</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('pool')} name='pool' onChange={handleCbClick} />
                🎱
                <span>Pool table</span>
            </label>
            <label className='border p-4 flex rounded-2xl gap-1 text-lg cursor-pointer'>
                <input type='checkbox' checked={selected.includes('games')} name='games' onChange={handleCbClick} />
                🎲
                <span>Board games</span>
            </label>
        </>
    )
}
