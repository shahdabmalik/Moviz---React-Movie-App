import React from 'react'
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import Cast from './cast/Cast'
import VideosSection from './videosSection/VideosSection'
import Similar from './similar/Similar'
import Recommended from './recommended/Recommended'

const Details = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div className=' bg-slate-900 font-poppins' >
      <DetailsBanner video={data?.results} crew={credits?.crew} />
      <Cast cast={credits?.cast} loading={creditsLoading} />
      <VideosSection video={data?.results} loading={loading}  />
      <Similar />
      <Recommended />
    </div>
  )
}

export default Details