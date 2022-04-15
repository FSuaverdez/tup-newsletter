import React from 'react';

const Modal = ({ handleClose, children }) => {
  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-10 flex justify-center items-center flex-col'
      onClick={handleClose}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
