import React from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

const Home = () => {
  return (
    <div className='w-full h-screen grid grid-cols-5 bg-white dark:bg-gray-800 gap-8'>
      <Sidebar />
      <div className='col-span-5 md:col-span-4'>
        <Main />
      </div>
    </div>
  )
}

export default Home
