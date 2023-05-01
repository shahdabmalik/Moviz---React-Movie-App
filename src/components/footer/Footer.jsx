import React from 'react'
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white font-poppins font-light">
      <div className='py-8 px-4 text-sm lg:w-3/5 w-full max-w-screen-2xl mx-auto flex flex-col gap-6'>

        <ul className="flex justify-center gap-4 lg:gap-8 text-center">
          <li className="cursor-pointer hover:text-orange-400">Terms Of Use</li>
          <li className="cursor-pointer hover:text-orange-400">Privacy-Policy</li>
          <li className="cursor-pointer hover:text-orange-400">About</li>
          <li className="cursor-pointer hover:text-orange-400">Blog</li>
          <li className="cursor-pointer hover:text-orange-400">FAQ</li>
        </ul>
        <div className="text-center text-sm text-slate-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="flex justify-center gap-5 md:gap-10 text-xl">
          <span className="bg-slate-900 p-4 rounded-full cursor-pointer hover:bg-slate-800">
            <FaFacebookF />
          </span>
          <span className="bg-slate-900 p-4 rounded-full cursor-pointer hover:bg-slate-800">
            <FaInstagram />
          </span>
          <span className="bg-slate-900 p-4 rounded-full cursor-pointer hover:bg-slate-800">
            <FaTwitter />
          </span>
          <span className="bg-slate-900 p-4 rounded-full cursor-pointer hover:bg-slate-800">
            <FaLinkedin />
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer