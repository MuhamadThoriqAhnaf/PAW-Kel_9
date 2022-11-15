import React from 'react'
import Logo from "../assets/Logo.svg"

export default function Navbar() {
  return (
    <div className='flex px-[140px] py-[16px] items-center justify-between bg-[#D9E5D6] '>
        <img src={Logo}></img>
        <input placeholder='Cari Buku' className='border-2' ></input>
    
    </div>
  )
}
