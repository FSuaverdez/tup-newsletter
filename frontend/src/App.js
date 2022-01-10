import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { authActions } from './app/slices/authSlice'
import decode from 'jwt-decode'

import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [userData, setUserData] = useState(user)

  const logout = useCallback(() => {
    dispatch(authActions.LOGOUT())
    navigate('/')
  }, [navigate, dispatch])

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }
    setUserData(JSON.parse(localStorage.getItem('profile')))
  }, [user, logout, setUserData])

  return (
    <div className='bg-gray-100'>
      {userData && userData.name}
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
