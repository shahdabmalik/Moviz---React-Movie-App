import React from 'react'
import useFetch from '../../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Carousel from '../../../components/carousel/Carousel'

const Recommended = () => {

    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`)

    return (
        <>
            <div className='text-white max-w-screen-xl w-full mx-auto mt-8 px-4 sm:px-6 pb-8' >
                {data?.results?.length > 0 && <h3 className='text-2xl mb-4' >Recommended <span>{mediaType === 'movie' ? 'Movies' : 'Shows'}</span></h3>}
                <Carousel data={data?.results} endpoint={mediaType} loading={loading} />
            </div >
        </>

    )
}

export default Recommended