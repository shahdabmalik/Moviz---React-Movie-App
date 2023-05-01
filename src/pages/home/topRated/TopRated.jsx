import React, { useState } from 'react'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const TopRated = () => {

    const [endpoint, setEndpoint] = useState("movie")
    const { data, loading } = useFetch(`/${endpoint}/top_rated`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? 'movie' : 'tv')
    }

    return (
        <div className=' max-w-screen-2xl mx-auto px-4 md:px-6' >
            <div className='flex justify-between items-center'>
                <h3 className='text-2xl font-medium' >Top Rated</h3>
                <SwitchTab data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </div>
            <div className='py-8' >
                <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
            </div>
        </div>
    )
}

export default TopRated