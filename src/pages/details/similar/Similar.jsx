import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Carousel from '../../../components/carousel/Carousel'

const Similar = () => {

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)

    return (
        <>
            <div className='text-white max-w-screen-xl w-full mx-auto mt-8 px-4 sm:px-6' >
                <h3 className='text-2xl mb-4' >Similar <span>{mediaType === 'movie' ? 'Movies' : 'Shows'}</span></h3>
                <Carousel data={data?.results} endpoint={mediaType} loading={loading} />
            </div>
        </>

    )
}

export default Similar