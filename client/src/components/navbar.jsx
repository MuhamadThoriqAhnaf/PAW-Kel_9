import React from 'react'
import Logo from "../assets/Logo.svg"

export default function Navbar() {
  return (
    <div className='flex px-[10px] md:px-[140px] md:py-[16px] items-center justify-between bg-[#D9E5D6] h-[80px]'>
        <img src={Logo} className="w-[150px]"></img>
        <input placeholder='Cari Buku' className='border-2 h-[34px] w-[150px]' ></input>
    
    </div>
  )
}
