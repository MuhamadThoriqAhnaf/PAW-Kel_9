import React from 'react'
import Navbar from '../components/navbar'

export default function Welcome() {
  return (
    <>
    <Navbar />
    <div className='mx-[140px] my-[16px]'>
      <a href='/signup'className='text-[15px]'>Login</a>
    </div>
    
    </>
  )
}
