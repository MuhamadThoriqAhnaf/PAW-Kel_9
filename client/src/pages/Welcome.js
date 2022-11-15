import React from 'react'
import Navbar from '../components/navbar'
 
export default function Welcome() {
  return (
    <>
        <Navbar/>
        <div className='mx-[140px] my-[15px]'>
          <a href='/login'className=''>Login</a>
        </div>
    </>
  )
}
