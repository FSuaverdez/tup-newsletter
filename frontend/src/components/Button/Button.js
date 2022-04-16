import React from 'react';

const Button = ({ type, onClick: handleClick, children }) => {
  const typeClass =
    type === 'success'
      ? 'bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 mt-5'
      : type === 'danger'
      ? 'bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600 mt-5'
      : '';

  return (
    <button className={typeClass} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
