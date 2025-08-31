import { useState } from 'react';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full h-screen flex flex-col md:flex md:flex-row bg-white dark:bg-gray-800'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex-1'>
        <Header  setIsOpen={setIsOpen} />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
