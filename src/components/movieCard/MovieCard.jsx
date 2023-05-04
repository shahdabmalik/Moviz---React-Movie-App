import React from 'react'
import PosterFallback from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Img from '../lazyLoadImage/Img'
import CircleRating from '../circleRating/CircleRating'

const MovieCard = ({ item, fromSearch, media_type }) => {

    const navigate = useNavigate()
    const posterUrl = item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : PosterFallback
    return (
        <div className='cursor-pointer hover:animate-pulse ' onClick={() => { navigate(`/${media_type}/${item?.id}`) }} >
            <div className='relative'>
                <Img src={posterUrl} alt={'poster'} className={" w-64 max-w-full rounded-xl aspect-9/16"} />
                {!fromSearch && (
                    <div className='absolute bottom-[-10px] rounded-full font-semibold left-2 w-10'>
                        <CircleRating rating={item.vote_average.toFixed(1)} backgroundColor={'#fff'} trailColor={'#fff'} textColor={'#000'} />
                    </div>
                )}
            </div>
            <p className=' text-lg text-ellipsis overflow-hidden h-8 mt-3 font-light ...' >{item.title || item.name}</p>
            <p className='text-slate-400 text-sm' >{media_type === 'movie' ? (dayjs(item?.release_date).format('MMM D, YYYY')) : (dayjs(item?.first_air_date).format('MMM D, YYYY'))}</p>
        </div>
    )
}

export default MovieCard