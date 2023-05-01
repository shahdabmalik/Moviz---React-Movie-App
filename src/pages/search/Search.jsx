import React, { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import { fetchDataFromApi } from '../../utils/api'
import { Oval, TailSpin } from 'react-loader-spinner'
import MovieCard from '../../components/movieCard/MovieCard'


const Search = () => {

  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()
  const pageNumRef = useRef(pageNum)

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNumRef.current}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
      pageNumRef.current = pageNum
      console.log(pageNumRef);
    })
  }

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      if (data?.results) {
        setData({
          ...data, results: [...data?.results, ...res.results]
        })
      } else {
        setData(res)
      }
      setPageNum((prev) => prev + 1)
      pageNumRef.current = pageNum
    })
  }

  useEffect( () => {
    setPageNum(1)
    pageNumRef.current = 1
    fetchInitialData();
  }, [query])

  return (
    <div className='  bg-slate-900 text-white' >
      <div className='max-w-screen-2xl w-full mx-auto px-4 sm:px-6' >
        {loading && (
          <div className='flex w-full h-screen justify-center items-center' >
            <Oval
              height={80}
              width={80}
              color="#ffffff"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#444"
              strokeWidth={3}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        {!loading && (
          <div>
            {data?.results.length > 0 ? (
              <>
                <h3 className='pt-[80px] text-xl' >{`Search Results for '${query}'`}</h3>
                <InfiniteScroll
                  className='grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-5'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={
                    <Oval
                      height={80}
                      width={80}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel='oval-loading'
                      secondaryColor="#444"
                      strokeWidth={3}
                      strokeWidthSecondary={2}
                    />
                  }
                >
                  {data?.results?.map((item, index) => {
                    if (item.media_type === 'person') return
                    return (
                      <MovieCard key={index} item={item} media_type={item?.media_type} fromSearch={true} />
                    )
                  })}
                </InfiniteScroll>
              </>
            ) : (
              <>Sorry</>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search