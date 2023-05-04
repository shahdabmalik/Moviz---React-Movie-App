import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import Img from '../lazyLoadImage/Img'
import { useSelector } from 'react-redux'
import PosterFallback from '../../assets/no-poster.png'
import dayjs from 'dayjs'
import 'react-circular-progressbar/dist/styles.css';
import CircleRating from '../circleRating/CircleRating'
import { useNavigate } from 'react-router-dom'
import { Autoplay } from 'swiper'

const Carousel = ({ data, loading, endpoint }) => {

    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    

    const swiperSlide = () => {
        return (
            <SwiperSlide className=' animate-pulse' >
                <div className='relative'>
                    <div className=" max-w-full bg-slate-800 rounded-xl aspect-9/16" ></div>
                    {/* <div className='absolute bottom-[-10px] bg-slate-700 rounded-full p-1 font-semibold left-2 h-10 w-10'></div> */}
                </div>
                <p className=' text-lg text-ellipsis overflow-hidden rounded-md w-full bg-slate-800 h-6 mt-6 font-light ...' ></p>
                <p className='bg-slate-800 text-sm h-[20px] mt-2 rounded-md w-[100px]' ></p>
            </SwiperSlide>
        )
    }

    return (
        <Swiper
            // slidesPerView={6}
            loop={true}
            spaceBetween={20}
            autoplay={{
                delay:5000,
                disableOnInteraction: false
            }}
            modules={[Autoplay]}
            breakpoints={{
                300: {
                    slidesPerView: 2
                },
                550: {
                    slidesPerView: 3
                },
                800: {
                    slidesPerView: 4
                },
                1050: {
                    slidesPerView: 5
                },
                1300: {
                    slidesPerView: 6
                },
            }}
        >
            {!loading ? (
                <div>
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? "https://image.tmdb.org/t/p/w500" + item.poster_path : PosterFallback
                        return (
                            <SwiperSlide className=' cursor-pointer' key={item.id} onClick={() => {
                                if (endpoint === 'day' || endpoint === 'week') {
                                    navigate(`/${item.media_type}/${item.id}`)
                                } else {
                                    navigate(`/${endpoint}/${item.id}`)
                                }
                            }} >
                                <div className='relative'>
                                    <Img src={posterUrl} alt={'poster'} className={" w-64 max-w-full rounded-xl aspect-9/16"} />
                                    <div className='absolute bottom-[-10px] rounded-full font-semibold left-2 w-10'>
                                        <CircleRating rating={item.vote_average.toFixed(1)} backgroundColor={'#fff'} trailColor={'#fff'} textColor={'#000'} />
                                    </div>
                                </div>
                                <p className=' text-lg text-ellipsis overflow-hidden h-8 mt-6 font-light ...' >{item.title || item.name}</p>
                                <p className='text-slate-400 text-sm' >{ item?.media_type ? (item?.media_type === "movie" ? dayjs(item.release_date).format("MMM D, YYYY") : dayjs(item.first_air_date).format("MMM D, YYYY")) : (endpoint === "movie" ? dayjs(item.release_date).format("MMM D, YYYY") : dayjs(item.first_air_date).format("MMM D, YYYY")) }</p>
                            </SwiperSlide>
                        )
                    })}
                </div>
            ) : (
                <div>
                    {swiperSlide()}
                    {swiperSlide()}
                    {swiperSlide()}
                    {swiperSlide()}
                    {swiperSlide()}
                    {swiperSlide()}
                </div>
            )}
        </Swiper>
    )
}

export default Carousel