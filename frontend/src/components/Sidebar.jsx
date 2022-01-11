import { NavLink, Link, useNavigate } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'

import logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../app/slices/authSlice'
import { useCallback } from 'react'
import SidebarRoutes from './SidebarRoutes'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize py-2'
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-500 border-black  transition-all duration-200 ease-in-out capitalize py-2'

const categories = [
  {
    name: 'Colleges',
    subCategories: [
      { name: 'College of Science', slug: 'College-of-Science' },
      { name: 'College of Engineering', slug: 'College-of-Engineering' },
      {
        name: 'College of Architecture and Fine Arts',
        slug: 'College-of-Architecture-and-Fine-Arts',
      },
      {
        name: 'College of Industrial Technology',
        slug: 'College-of-Industrial-Technology',
      },
      {
        name: 'College of Indutrial Education',
        slug: 'College-of-Indutrial-Education',
      },
    ],
  },
  {
    name: 'Organizations',
    subCategories: [
      { name: 'Math Society', slug: 'Math-Society' },
      { name: 'TUP Gear', slug: 'TUP-Gear' },
      { name: 'Green Society', slug: 'Green-Society' },
    ],
  },
  {
    name: 'Departments',
    subCategories: [
      { name: 'Math Department', slug: 'Math-Department' },
      { name: 'Physics Department', slug: 'Physics-Department' },
      {
        name: 'Computer Studies Department',
        slug: 'Computer-Studies-Department',
      },
    ],
  },
]

const Sidebar = ({ closeToggle }) => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }

  const logout = useCallback(() => {
    dispatch(authActions.LOGOUT())
    navigate('/')
  }, [navigate, dispatch])

  return (
    <div className='flex flex-col  bg-white h-full overflow-y-scroll min-w-350 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 pt-1 items-center mt-4'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-16 drop-shadow-md ' />
          <h2 className='text-2xl font-bold ml-4 text-red-500 w-full'>
            TUP NewsLetter
          </h2>
        </Link>
        {user ? (
          <div className='bg-white rounded-lg shadow-lg mx-3 p-2 mt-5 my-6 '>
            <div className='flex items-center  '>
              <Link
                to={`user-profile/${user._id}`}
                className='flex   gap-2  items-center justify-center '
                onClick={handleCloseSidebar}
              >
                <img
                  src={user.imageUrl}
                  alt='user-rpofile'
                  className='w-10 h-10 rounded-full'
                />
                <p className='text-sm'>{user.name}</p>
              </Link>
              <button
                type='button'
                className='text-sm text-white rounded bg-red-500 items-center justify-center mx-auto py-1 px-3'
                onClick={logout}
              >
                Logout
              </button>
            </div>
            <div className='p-2'>
              <NavLink
                to='/admin'
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                Admin Dashboard
              </NavLink>
              <NavLink
                to='/content'
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
              >
                Content Management
              </NavLink>
            </div>
          </div>
        ) : (
          <Link
            to={`login`}
            className='text-white rounded bg-red-500 items-center justify-center mx-auto py-1 px-3'
            onClick={handleCloseSidebar}
          >
            Login
          </Link>
        )}
        <div className='flex flex-col gap-5'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <SidebarRoutes
            categories={categories}
            handleCloseSidebar={handleCloseSidebar}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
