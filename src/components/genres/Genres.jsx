import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home)
    return (
        <div className='text-xs flex gap-2 mt-3 flex-wrap' >
            {data?.map((genre, index) => {
                return (
                    <div className='bg-red-700 py-0.5 px-1 rounded-sm' key={index}>{genres[genre]?.name}</div>
                )
            })}
        </div>
    )
}

export default Genres