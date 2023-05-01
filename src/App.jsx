import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api'
import { getApiConfig, getGenres } from './redux/home/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Search from './pages/search/Search'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'


function App() {

  const dispatch = useDispatch()
  const url = useSelector((state) => state.home.url)

  const fetchApiConfig = async () => {
    const data = await fetchDataFromApi("/configuration")
    const url = {
      backdrop: data?.images?.secure_base_url + "original",
      poster: data?.images?.secure_base_url + "original",
      profile: data?.images.secure_base_url + "original"
    }
    dispatch(getApiConfig(url))
  }

  // Get all genres
  const genresCall = async () => {
    let promises = []
    let endpoint = ['tv', 'movie']
    let allGenres = {}
    endpoint.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({ genres }) => {
      genres.map((item) => (allGenres[item.id] = item))
    })
    dispatch(getGenres(allGenres))
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
