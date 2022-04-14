import { NavLink } from 'react-router-dom'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize py-2'
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-500 border-black  transition-all duration-200 ease-in-out capitalize py-2'

const SidebarAdmin = ({ handleCloseSidebar }) => {
  return (
    <div className='flex flex-col gap-'>
      <NavLink
        to='/admin/category'
        className={({ isActive }) =>
          `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
        }
        end={true}
      >
        Categories
      </NavLink>
      <NavLink
        to='/admin/subcategory'
        className={({ isActive }) =>
          `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
        }
        end={true}
      >
        Subcategories
      </NavLink>
    </div>
  )
}

export default SidebarAdmin