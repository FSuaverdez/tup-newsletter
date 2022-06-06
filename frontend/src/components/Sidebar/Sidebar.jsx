import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';

import logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../app/slices/authSlice';
import { useCallback } from 'react';
import SidebarRoutes from '../../routes/SidebarRoutes';
import { useGetPermissionsQuery } from '../../app/services/authApi';
import Loading from '../Loading/Loading'

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-gray-500 hover:text-red-400 transition-all duration-200 ease-in-out capitalize py-2';
const isActiveStyle =
  'flex items-center px-5 gap-3 font-bold text-red-600 border-r-2 border-red-500 transition-all duration-200 ease-in-out capitalize py-2';

const Sidebar = ({ closeToggle }) => {
  const user = useSelector(state => state.user);

  const { data, isLoading } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const logout = useCallback(() => {
    dispatch(authActions.LOGOUT());
    navigate('/');
  }, [navigate, dispatch]);

  if (isLoading) return <Loading/>;

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
              <div
                className='flex   gap-2  items-center justify-center '
                onClick={handleCloseSidebar}
              >
                <img
                  src={user.imageUrl}
                  alt='user-rpofile'
                  className='w-10 h-10 rounded-full'
                />
                <p className='text-sm'>{user.name}</p>
              </div>
              <button
                type='button'
                className='text-sm text-white rounded bg-red-500 items-center justify-center mx-auto py-1 px-3'
                onClick={logout}
              >
                Logout
              </button>
            </div>
            {user.isAdmin || data?.showAdmin || data?.showContent ? (
              <>
                <div className='p-2'>
                  {user.isAdmin || data?.showAdmin ? (
                    <NavLink
                      to='/admin'
                      className={({ isActive }) =>
                        isActive ? isActiveStyle : isNotActiveStyle
                      }
                      onClick={handleCloseSidebar}
                    >
                      Admin Dashboard
                    </NavLink>
                  ) : null}
                  {user.isAdmin || data?.showContent ? (
                    <NavLink
                      to='/content'
                      className={({ isActive }) =>
                        isActive ? isActiveStyle : isNotActiveStyle
                      }
                      onClick={handleCloseSidebar}
                    >
                      Content Management
                    </NavLink>
                  ) : null}
                </div>
              </>
            ) : null}
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
          <SidebarRoutes handleCloseSidebar={handleCloseSidebar} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
