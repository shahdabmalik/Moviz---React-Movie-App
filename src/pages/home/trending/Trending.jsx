import React, { useState } from 'react'
import SwitchTab from '../../../components/switchTab/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

const Trending = () => {

    const [endpoint, setEndpoint] = useState("day")

    const { data, loading } = useFetch(`/trending/all/${endpoint}`)

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? 'day' : 'week')
    }

    return (
        <div className=' max-w-screen-2xl mx-auto px-4 md:px-6' >
            <div className='flex justify-between items-center'>
                <h3 className='text-2xl font-medium' >Trending</h3>
                <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
            </div>
            <div className='py-8' >
                <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
            </div>
        </div>
    )
}

export default Trending