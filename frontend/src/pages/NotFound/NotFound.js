import React from 'react';
import Error from '../../assets/warning.png'

const NotFound = () => {
  return (
    <div className='w-full h-full bg-gray-100 flex justify-center items-center'>
      <div className='flex-col items-center self-center'>

        <div className='flex justify-center'>
          <img src={Error} width="28%" height="28%" />
        </div>

        <div className='flex justify-center'>
          <h1 className='text-red-500 mt-2 font-bold text-9xl'>404</h1>
        </div>

        <div className='flex justify-center'>
          <h5 className='text-gray-500 mt-2 font-bold text-4xl'>Page not found!</h5>
        </div>

        <div className='flex justify-center'>
          <h5 className='text-gray-500 mt-3 font-bold text-xl'>The resource requested could not be found on this server!</h5>
        </div>
     
      </div>
    </div>
  );
};

export default NotFound;
