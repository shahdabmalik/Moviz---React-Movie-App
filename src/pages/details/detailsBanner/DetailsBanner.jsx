import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import PosterFallback from '../../../assets/no-poster.png'
import dayjs from 'dayjs'
import CircleRating from '../../../components/circleRating/CircleRating'
import Genres from '../../../components/genres/Genres'
import VideoPopup from '../../../components/videoPopup/VideoPopup'

const DetailsBanner = ({ video, crew }) => {

    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const trailer = video?.filter((v) => (v.type === 'Trailer'))

    document.title = data ? data?.title || data?.name : "Moviea"

    const itemGenres = data?.genres.map((g) => g.id)

    const director = crew?.filter((f) => f.job === 'Director')
    const writer = crew?.filter((f) => f.job === 'Screeenplay' || f.job === 'Story' || f.job === 'Writer')
    const toHoursToMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours > 0 ? `${hours}h` : ""} ${minutes > 0 ? ` ${minutes}m` : ""}`
    }


    return (
        <>
            {!loading ? (
                <>
                    {!!data && (
                        <div className='w-full z-10 relative' >
                            <div className=' overflow-hidden absolute  opacity-10 top-0 left-0 w-full h-[650px] 3xl:h-[800px]' >
                                <Img src={"https://image.tmdb.org/t/p/w1280" + (data?.backdrop_path)} className={`w-full object-cover h-[650px] 3xl:h-[800px]`} alt='backdrop' />
                                <div className='absolute bottom-0 w-full h-[300px] bg-gradient-to-t from-slate-900 to-transparent' ></div>
                            </div>
                            <div className='max-w-screen-xl text-white relative w-full flex flex-col md:flex-row gap-0 md:gap-10 mx-auto pt-[60px] px-4 md:px-6' >
                                <div className='py-3' >
                                    <Img className=' max-w-full w-full xs:w-2/3 mx-auto md:w-[340px] rounded-lg' src={data?.poster_path ? ("https://image.tmdb.org/t/p/w500" + data?.poster_path) : PosterFallback} alt='poster' />
                                </div>
                                <div className='py-3 w-full md:w-1/2' >
                                    <div>
                                        <h1 className='text-white text-3xl font-light' >{(data?.title || data?.name)} <span className='text-xl' >{mediaType === 'movie' ? ("(" + dayjs(data?.release_date).format('YYYY') + ")") : ("(" + dayjs(data?.first_air_date).format('YYYY') + ")")}</span></h1>
                                        <p className='text-slate-400 italic text-sm' >{data?.tagline}</p>
                                    </div>
                                    <Genres data={itemGenres} />
                                    <div className='my-5 flex gap-3 items-center'>
                                        <div className=' w-16  md:w-20'>
                                            <CircleRating rating={data?.vote_average.toFixed(1)} backgroundColor={'#000'} trailColor={'#000'} textColor={'#fff'} />
                                        </div>
                                        <div onClick={() => {
                                            setShow(true)
                                            setVideoId(trailer[0].key)
                                        }}
                                            className=' flex items-center gap-3 cursor-pointer hover:text-red-500' >
                                            <div className='bg-black rounded-full font-light w-16 md:w-20 '>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                                </svg>
                                            </div>
                                            <div className=' font-light' >Watch Trailer</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-xl' >Overview</h3>
                                        <p className='w-full font-light mt-2 text-sm lg:text-base' >{data?.overview}</p>
                                    </div>
                                    <div className='flex gap-5 mt-7 border-b pb-4 border-slate-700' >
                                        <div className='font-medium flex gap-2 items-center flex-wrap text-sm' >Status:<span className='font-light flex items-center text-slate-400' >{data?.status}</span></div>
                                        <div className='font-medium flex gap-2 items-center flex-wrap text-sm' >Release Date:<span className='font-light flex items-center text-slate-400' >{mediaType === 'movie' ? dayjs(data?.release_date).format('MMM  D, YYYY') : dayjs(data?.first_air_date).format('MMM  D, YYYY')}</span></div>
                                        <div className='font-medium flex gap-2 items-center flex-wrap text-sm' >Runtime:<span className='font-light flex items-center text-slate-400' >{mediaType === 'movie' ? toHoursToMinutes(data?.runtime) : toHoursToMinutes(data?.episode_run_time)} {mediaType === 'tv' && ("/ episode")}</span></div>
                                    </div>
                                    {director?.length > 0 && (
                                        <div className='flex gap-5 mt-4 border-b pb-4 border-slate-700' >
                                            <div className='font-medium text-sm flex gap-2' > Director:
                                                {director?.map((d, i) => (
                                                    <span className='font-light flex items-center text-slate-400' key={i} >{d?.name}{director.length - 1 !== i && (', ')}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {writer?.length > 0 && (
                                        <div className='flex gap-5 mt-4 border-b pb-4 border-slate-700' >
                                            <div className='font-medium text-sm flex flex-wrap gap-2' > Writer:
                                                {writer?.map((d, i) => (
                                                    <span className='font-light flex items-center text-slate-400' key={i} >{d?.name}{writer.length - 1 !== i && (', ')}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {data?.created_by?.length > 0 && (
                                        <div className='flex gap-5 mt-4 border-b pb-4 border-slate-700' >
                                            <div className='font-medium text-sm flex flex-wrap gap-2' > Creator:
                                                {data?.created_by?.map((d, i) => (
                                                    <span className='font-light flex items-center text-slate-400' key={i} >{d?.name}{data?.created_by?.length - 1 !== i && (', ')}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                        </div>
                    )}
                </>
            ) : (
                <div className='w-full z-10 relative animate-pulse' >
                    <div className='max-w-screen-xl text-white relative w-full flex flex-col md:flex-row gap-0 md:gap-10 mx-auto pt-[60px] px-4 md:px-6' >
                        <div className='py-3' >
                            <div className=' max-w-full bg-slate-800 w-full xs:w-2/3 mx-auto md:w-[340px] aspect-9/16 rounded-lg'></div>
                        </div>
                        <div className='py-3 w-full md:w-1/2' >
                            <div>
                                <div className='h-8 rounded bg-slate-800 w-96 max-w-full' ></div>
                                <div className=' h-5 rounded mt-2 bg-slate-800 w-80 max-w-full' ></div>
                            </div>
                            <div className='flex gap-2 mt-2' >
                                <div className=' w-12 h-5 rounded-sm bg-slate-800' ></div>
                                <div className=' w-12 h-5 rounded-sm bg-slate-800' ></div>
                                <div className=' w-12 h-5 rounded-sm bg-slate-800' ></div>
                            </div>
                            <div className='my-5 flex gap-3 items-center'>
                                <div className=' w-16 md:w-20 aspect-1/1 bg-slate-800 rounded-full'>
                                </div>
                                <div className=' flex items-center gap-3 cursor-pointer hover:text-red-500' >
                                    <div className='bg-slate-800 rounded-full aspect-1/1 w-16 md:w-20 '>

                                    </div>
                                    <div className=' h-5 w-20 bg-slate-800 rounded' ></div>
                                </div>
                            </div>
                            <div>
                                <h3 className='h-7 w-24 bg-slate-800 rounded' ></h3>
                                <div className='w-full h-5 mt-2 bg-slate-800 rounded' ></div>
                                <div className='w-full h-5 mt-2 bg-slate-800 rounded' ></div>
                                <div className='w-full h-5 mt-2 bg-slate-800 rounded' ></div>
                                <div className='w-64 max-w-full h-5 mt-2 bg-slate-800 rounded' ></div>
                            </div>
                            <div className='flex gap-5 mt-7 border-b pb-4 border-slate-700' >
                                <div className='w-32 h-6 max-w-full bg-slate-800 rounded' ></div>
                                <div className='w-32 h-6 max-w-full bg-slate-800 rounded' ></div>
                                <div className='w-32 h-6 max-w-full bg-slate-800 rounded' ></div>
                            </div>
                            <div className='flex gap-5 mt-4 border-b pb-4 border-slate-700' >
                                <div className='w-32 h-6 max-w-full bg-slate-800 rounded' ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}

export default DetailsBanner