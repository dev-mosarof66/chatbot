import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Loading from './pages/Loading'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loader' element={<Loading />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </Suspense>
  )
}

export default App