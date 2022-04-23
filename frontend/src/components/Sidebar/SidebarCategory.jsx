import { NavLink } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useState } from 'react';

const isNotActiveStyle =
  'flex items-center pl-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize pr-5';
const isActiveStyle =
  'flex items-center pl-5 gap-3 font-bold text-red-600 border-r-2 border-red-600 transition-all duration-200 ease-in-out capitalize pr-5';

const SidebarCategory = ({ category, handleCloseSidebar }) => {
  const [toggleSubCategories, setToggleSubCategories] = useState(false);
  return (
    <div>
      <div className='flex items-center justify-between'>
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
          <div
            className='text-gray-500 cursor-pointer text-xl px-3 mr-14'
            onClick={() => setToggleSubCategories(prev => !prev)}
          >
            <AiFillCaretUp />
          </div>
        ) : (
          <div
            className=' text-gray-500 cursor-pointer text-xl px-3 mr-14'
            onClick={() => setToggleSubCategories(prev => !prev)}
          >
            <AiFillCaretDown />
          </div>
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
            key={subCat.slug}
          >
            {subCat.name}
          </NavLink>
        ))}
    </div>
  );
};

export default SidebarCategory;
