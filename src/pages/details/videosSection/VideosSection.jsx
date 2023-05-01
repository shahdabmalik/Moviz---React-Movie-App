import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import Img from '../../../components/lazyLoadImage/Img'
import VideoPopup from '../../../components/videoPopup/VideoPopup';

// import required modules
import { Autoplay, Navigation } from "swiper";

const VideosSection = ({ video, loading }) => {

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const swiperSlide = () => {
        return (
            <SwiperSlide>
                <div className='relative' >
                    <div className='w-full aspect-16/9'></div>
                    <div className='flex items-center justify-center bg-slate-800 text-white text-opacity-70 hover:text-red-500 cursor-pointer absolute top-0 left-0 w-full h-full' >
                    </div>
                </div>
            </SwiperSlide>
        )
    }

    return (
        <>
            <div className='text-white max-w-screen-xl w-full mx-auto mt-5 px-4 sm:px-6' >
                { video?.length > 0 && <h3 className='text-2xl mb-3' >Official Videos</h3>}
                <Swiper
                    // slidesPerView={6}
                    loop={true}
                    navigation={false}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        300: {
                            slidesPerView: 2
                        },
                        700: {
                            slidesPerView: 3
                        },
                        1000: {
                            slidesPerView: 4
                        },
                    }}
                >
                    {!loading ? (<div>
                        {video?.map((v) => (
                            <SwiperSlide key={v.key}>
                                <div className='relative' >
                                    <Img src={`https://img.youtube.com/vi/${v.key}/hqdefault.jpg`} className={'w-full aspect-16/9 object-cover'} />
                                    <div
                                        onClick={() => {
                                            setShow(true)
                                            setVideoId(v.key)
                                        }}
                                        className='flex items-center justify-center bg-black bg-opacity-25 text-white text-opacity-70 hover:text-red-500 cursor-pointer absolute top-0 left-0 w-full h-full' >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                        </svg>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </div>) : (
                        <div>
                            {swiperSlide()}
                            {swiperSlide()}
                            {swiperSlide()}
                            {swiperSlide()}
                        </div>
                    )}

                </Swiper>
                <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                />
            </div>
        </>
    )
}

export default VideosSection