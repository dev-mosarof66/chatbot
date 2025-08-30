import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'

const Home = () => {


  return (
    <div className='w-full h-screen flex flex-col md:flex md:flex-row bg-white dark:bg-gray-800 gap-8'>
      <Sidebar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
