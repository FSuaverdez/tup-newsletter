import { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import HomeRoutes from '../../routes/HomeRoutes';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const user = useSelector(state => state.user);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);
  return (
    <div className='flex bg-gray-50 lg:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden lg:flex h-screen flex-initial'>
        <Sidebar />
      </div>
      <div className='flex lg:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />
          <Link to='/' className='flex justify-center items-center'>
            <img src={logo} alt='logo' className='w-16 drop-shadow-md ' />
            <h2 className='text-2xl font-bold ml-4 text-red-600'>
              TUP NewsLetter
            </h2>
          </Link>
          {user && (
            <Link to={`user-profile/${user?._id}`}>
              <img
                src={user.imageUrl}
                alt='logo'
                className='w-16 rounded-full border border-gray-200 shadow-md'
              />
            </Link>
          )}
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in '>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <HomeRoutes />
      </div>
    </div>
  );
};

export default Home;
