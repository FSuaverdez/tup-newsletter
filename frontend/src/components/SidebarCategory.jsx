import { NavLink } from 'react-router-dom'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { useState } from 'react'

const isNotActiveStyle =
  'flex items-center pl-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  'flex items-center pl-5 gap-3 font-bold text-red-600 border-red-600 border-black  transition-all duration-200 ease-in-out capitalize'

const SidebarCategory = ({ category, handleCloseSidebar }) => {
  const [toggleSubCategories, setToggleSubCategories] = useState(false)
  return (
    <div>
      <div className='flex items-center '>
        <NavLink
          to={`/category/${category.name}`}
          className={({ isActive }) =>
            `${isActive ? isActiveStyle : isNotActiveStyle} font-bold`
          }
          onClick={handleCloseSidebar}
          end={true}
        >
          {category.name}
        </NavLink>
        {toggleSubCategories ? (
          <AiFillCaretUp
            onClick={() => setToggleSubCategories(prev => !prev)}
            className='ml-5 text-gray-500 cursor-pointer '
          />
        ) : (
          <AiFillCaretDown
            onClick={() => setToggleSubCategories(prev => !prev)}
            className='ml-5  text-gray-500 cursor-pointer '
          />
        )}
      </div>
      {toggleSubCategories &&
        category.subCategories.map(subCat => (
          <NavLink
            to={`/category/${category.name}/${subCat.slug}`}
            className={({ isActive }) =>
              `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
            }
            onClick={handleCloseSidebar}
            key={subCat}
          >
            {subCat.name}
          </NavLink>
        ))}
    </div>
  )
}

export default SidebarCategory
