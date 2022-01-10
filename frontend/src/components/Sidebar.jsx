import { NavLink, Link, Routes, Route } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'

import logo from '../assets/logo.png'
import { useSelector } from 'react-redux'
import SidebarCategory from './SidebarCategory'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-600 border-black  transition-all duration-200 ease-in-out capitalize'

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

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }
  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-350 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 my-6 pt-1 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt='logo' className='w-16 drop-shadow-md ' />
          <h2 className='text-2xl font-bold ml-4 text-red-600 w-fu'>
            TUP NewsLetter
          </h2>
        </Link>
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
          <Routes>
            <Route path='/admin/category' element={<>admintabs</>} />
            <Route
              path='/*'
              element={
                <>
                  <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
                    Categories
                  </h3>
                  {categories.map(category => (
                    <SidebarCategory
                      key={category.name}
                      category={category}
                      handleCloseSidebar={handleCloseSidebar}
                    />
                  ))}
                </>
              }
            />
          </Routes>
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
          onClick={handleCloseSidebar}
        >
          <img
            src={user.imageUrl}
            alt='user-rpofile'
            className='w-10 h-10 rounded-full'
          />
          <p>{user.name}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar
