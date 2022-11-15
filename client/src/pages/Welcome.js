import React from 'react'
import Navbar from '../components/navbar'
 
export default function Welcome() {
  return (
    <>
        <Navbar/>
        <div className='md:mx-[140px] my-[15px] ml-[20px]'>
          <a href='/login'className=''>Login</a>
        </div>
    </>
  )
}
