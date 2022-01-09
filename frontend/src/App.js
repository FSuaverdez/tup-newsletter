import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='bg-gray-100'>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
