import React from 'react'
import { useSelector } from 'react-redux'
import ProfileFallback from '../../../assets/avatar.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import Img from '../../../components/lazyLoadImage/Img';
import "swiper/css"
import "swiper/css/navigation";
import { Autoplay, Navigation } from 'swiper';


const Cast = ({ cast, loading }) => {


    const swiperSlide = () => {
        return (
            <SwiperSlide className=' animate-pulse' >
                <div className=' flex flex-col items-center justify-center overflow-hidden text-ellipsis'>
                    <div className='rounded-full bg-slate-800 h-[100px] w-[100px] mx-auto'></div>
                    <div className='mt-3 rounded bg-slate-800 w-24 h-4' ></div>
                    <div className='mt-2 rounded bg-slate-800 w-20 h-3' ></div>
                </div>
            </SwiperSlide>
        )
    }

    return (
        <>
            <div className='text-white max-w-screen-xl w-full mx-auto mt-8 px-4 sm:px-6' >
                <h3 className='text-3xl mb-3' >Cast</h3>
                <Swiper
                    loop={true}
                    navigation={false}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    spaceBetween={20}
                    modules={[Autoplay, Navigation]}
                    breakpoints={{
                        200: {
                            slidesPerView: 2
                        },
                        300: {
                            slidesPerView: 3
                        },
                        500: {
                            slidesPerView: 4
                        },
                        650: {
                            slidesPerView: 5
                        },
                        800: {
                            slidesPerView: 6
                        },
                        950: {
                            slidesPerView: 7
                        },
                        1100: {
                            slidesPerView: 9
                        },
                    }}
                >
                    {!loading ? (
                        <div className=''>
                            {cast?.map((c) => {
                                const profileUrl = c.profile_path ? "https://image.tmdb.org/t/p/w185" + c.profile_path : ProfileFallback
                                return (
                                    <SwiperSlide key={c.id}>
                                        <div className=' flex flex-col items-center justify-center overflow-hidden text-ellipsis'>
                                            <Img src={profileUrl} alt={'profile'} className={'rounded-full object-cover h-[100px] w-[100px] mx-auto'} />
                                            <span className='mt-3 text-sm text-center  h-5 overflow-hidden' >{c?.name}</span>
                                            <span className=' text-xs text-center text-slate-400 h-4 overflow-hidden' >{c?.character}</span>
                                        </div>
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
                            {swiperSlide()}
                            {swiperSlide()}
                            {swiperSlide()}
                        </div>
                    )}
                </Swiper>
            </div>
        </>
    )
}

export default Cast