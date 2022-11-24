import React from 'react'

export default function Navbar() {
  return (
    <div className='rounded-b-3xl flex px-[10px] md:px-[140px] md:py-[16px] items-center justify-between bg-[#D9E5D6] h-[80px]'>
      <a href="/" class="flex">
        <img src="logo-black.svg " class="h-10 flex-auto"></img>
        <span class=" ml-2 mt-2 font-bold font-rubik text-xl flex-auto">MyLibrary</span>
        </a>
        <a href="/login" className="md:pr-20 text-xl text-black font-bold font-rubik transition-colors hover:text-blue-800 ">
        Login
        </a>          
        </div>

  )
}
