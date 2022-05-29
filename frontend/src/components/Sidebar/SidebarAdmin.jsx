import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../app/services/authApi';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize py-2';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-500  transition-all duration-200 ease-in-out capitalize py-2';

const SidebarAdmin = ({ handleCloseSidebar }) => {
  const user = useSelector(state => state.user);

  const { data, isLoading } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });

  return (
    <div className='flex flex-col gap-'>
      {user.isAdmin || data.showCategoryAdmin ? (
        <NavLink
          to='/admin/category'
          className={({ isActive }) =>
            `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
          }
        >
          Categories
        </NavLink>
      ) : null}
      {user.isAdmin || data.showSubCategoryAdmin ? (
        <NavLink
          to='/admin/subcategory'
          className={({ isActive }) =>
            `${isActive ? isActiveStyle : isNotActiveStyle} ml-5`
          }
        >
          Subcategories
        </NavLink>
      ) : null}
    </div>
  );
};

export default SidebarAdmin;
