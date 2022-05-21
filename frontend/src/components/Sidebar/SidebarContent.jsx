import { NavLink } from 'react-router-dom';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize py-2';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-500  transition-all duration-200 ease-in-out capitalize py-2';

const SidebarContent = ({ handleCloseSidebar }) => {
  return (
    <div className='flex flex-col gap-'>
      <NavLink
        to='/content/category'
        className={({ isActive }) =>
          `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
        }
      >
        Categories
      </NavLink>
      <NavLink
        to='/content/subcategory'
        className={({ isActive }) =>
          `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
        }
      >
        Subcategories
      </NavLink>
    </div>
  );
};

export default SidebarContent;
