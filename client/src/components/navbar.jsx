import React from 'react'

export default function Navbar() {
  return (
    <div className='rounded-b-3xl flex px-[10px] md:px-[140px] md:py-[16px] items-center justify-between bg-[#D9E5D6] h-[80px]'>
      <div class="flex">
        <img src="logo-black.svg " class="h-10 flex-auto"></img>
        <span class=" ml-2 mt-2 font-bold font-rubik text-xl flex-auto">MyLibrary</span>
      </div>
        <input placeholder='Cari Buku...' className='placeholder:italic placeholder:text-slate-400 block bg-white md:w-full w-200 border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm border-10 h-[34px] md:w-[300px]' ></input>
    </div>
  )
}
