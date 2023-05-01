import React, { useEffect, useState } from 'react'
import logo from '../../assets/movix-logo.svg'
import { GoSearch } from 'react-icons/go'
import { BiMenu } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const [isOpen, setIsOpen] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [query, setQuery] = useState("")
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Navbar show hide transition
  const controlNav = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !isOpen && !isSearch) {
        setHide(true)
        setShow(false)
      } else {
        setShow(true)
        setHide(false)
      }
    } else if (window.scrollY < 200) {
      setShow(false)
    }
    setLastScrollY(window.scrollY)
  }

  // Scroll transition trigger
  useEffect(() => {
    window.addEventListener("scroll", controlNav)
    return () => {
      window.removeEventListener("scroll", controlNav)
    }
  }, [lastScrollY])

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setIsSearch(false)
        setQuery('')
      }, 500);
    }
  }

  const toggleSearch = () => {
    setIsOpen(false)
    setIsSearch(!isSearch)
  }
  const toggleNav = () => {
    setIsSearch(false)
    setIsOpen(!isOpen)
  }

  const navigationHandle = (type) => {
    if (type === "movie") {
      navigate("/explore/movie")
    } else {
      navigate("/explore/tv")
    }
    setIsOpen(false)
    setIsSearch(false)
  }

  const goHome = () => {
    navigate("/")
    setIsSearch(false)
    setIsOpen(false)
  }

  return (
    <header className={'w-full font-poppins fixed top-0 left-[50%] bg-slate-950  translate-x-[-50%] z-20 backdrop-blur-sm transition-all  ' + (isOpen && " bg-opacity-100 ") + (show && " bg-opacity-100 ") + (!isOpen && !show && " bg-opacity-40 ") + (hide && " top-[-100px] ")} >
      <div className='max-w-screen-2xl w-full mx-auto px-4 md:px-6 py-2 sm:py-1 flex justify-between items-center relative z-20' >
        <div className='w-28 sm:w-40 z-50 py-1' >
          <img onClick={goHome} className='w-full cursor-pointer' src={logo} alt='logo' />
        </div>
        <div className='text-white flex gap-8' >
          <ul className={`flex gap-3 pl-6 sm:pl-0 sm:gap-8 flex-col sm:flex-row absolute top-0 left-0 sm:static bg-slate-950 sm:bg-transparent py-4 sm:py-0 w-full sm:items-center z-0 transition-all sm:opacity-100 sm:border-b-0  ${isOpen ? "top-full opacity-100 border-b border-orange-300 border-opacity-40" : " top-[-100px] opacity-0 "}`} >
            <li onClick={() => { navigationHandle("movie") }} className=' cursor-pointer hover:text-orange-400 transition-all' >Movies</li>
            <li onClick={() => { navigationHandle("tv") }} className=' cursor-pointer hover:text-orange-400 transition-all' >TV Shows</li>
          </ul>
          <div className={'absolute  w-full left-0 flex items-center bg-slate-800 transition-all ' + (isSearch ? "top-full opacity-100" : " top-[-100px] opacity-0 ")} >
            <input type='text' placeholder='Search' value={query} onChange={(e) => { setQuery(e.target.value) }} onKeyUp={searchQueryHandle} className='w-full p-2 pl-6 bg-inherit focus:outline-none text-center sm:p-4 placeholder:text-slate-400' autoFocus />
            <button onClick={toggleSearch} className=' cursor-pointer hover:text-orange-400 transition-all text-2xl bg-inherit p-2 sm:p-4' >{<RxCross2 />}</button>
          </div>
          <div className='flex gap-4 z-40'>
            <button onClick={toggleSearch} className=' focus:outline-none cursor-pointer hover:text-orange-400 transition-all text-lg mt-1' >{<GoSearch />}</button>
            <button onClick={toggleNav} className=' cursor-pointer hover:text-orange-400 transition-all text-2xl mt-1 sm:hidden' >{!isOpen ? (<BiMenu />) : (<RxCross2 />)}</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header