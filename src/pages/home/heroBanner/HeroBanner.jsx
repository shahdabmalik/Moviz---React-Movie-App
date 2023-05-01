import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyLoadImage/Img'

const HeroBanner = () => {

    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)

    const [background, setBackground] = useState("")
    const [query, setQuery] = useState("")

    const { data, loading } = useFetch("/movie/now_playing")

    useEffect(() => {
        if (data) {
            const bg = "https://image.tmdb.org/t/p/original" + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
            setBackground(bg)
        }
    }, [data])

    const searchQueryHandle = (e) => {
        if (e.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <div className='w-full px-4 md:px-6 relative flex justify-center items-center flex-col gap-5 bg-black h-[450px] md:h-[550px] 2xl:h-[600px] z-10' >
            <div className='w-full overflow-hidden absolute opacity-50 top-0 left-0  ' >
                <Img src={background} className={`w-full object-cover  h-[450px] md:h-[550px] 2xl:h-[600px]`} alt='backdrop' />
            </div>
            <div className='absolute bottom-0 w-full h-[250px] bg-gradient-to-t from-slate-900 to-transparent' ></div>
            <div className='relative text-center text-white'>
                <h3 className='text-4xl sm:text-6xl md:text-7xl font-semibold ' >Welcome</h3>
                <p className='text-sm md:text-xl font-light' >Millions of movies, TV shows and people to discover. Explore Now</p>
            </div>
            <div className='flex items-center opacity-100 relative rounded-full bg-white overflow-hidden max-w-full'>
                <input className='p-2 px-3  w-60 sm:w-96 max-w-full focus:outline-none text-slate-700' type='text' placeholder='Search' onKeyUp={searchQueryHandle} onChange={(e) => { setQuery(e.target.value) }} />
                <button onClick={() => { navigate(`/search/${query}`) }} type='button' className='p-2  bg-gradient-to-r from-orange-600 to-orange-500 text-white border-0 font-ligth hover:bg-blue-500' >Search</button>
            </div>
        </div>
    )
}

export default HeroBanner