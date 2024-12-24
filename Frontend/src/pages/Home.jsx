import React from 'react'
import Sidebar from '../Components/Home/Sidebar'
import { Outlet } from 'react-router'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-4'>
      <div className='border border-gray-500 rounded-xl flex flex-col justify-between p-4 w-1/6'>
        <Sidebar />
      </div>
      <div className='border border-gray-500 rounded-xl p-4 w-5/6'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
