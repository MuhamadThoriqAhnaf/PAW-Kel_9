import React from 'react'

export default function Navbar() {
  return (
    <div className='flex px-[10px] md:px-[140px] md:py-[16px] items-center justify-between bg-[#D9E5D6] h-[80px]'>
        <img src="logo-black.svg" className="h-10"></img>
        <input placeholder='Cari Buku' className='border-2 h-[34px] w-[150px]' ></input>
    
    </div>
  )
}
