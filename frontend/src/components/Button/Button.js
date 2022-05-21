import React from 'react';

const Button = ({
  type,
  onClick: handleClick,
  children,
  className: classes,
}) => {
  let buttonClass = getButtonClass(type);

  return (
    <button className={`${buttonClass} ${classes}`} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;

const getButtonClass = type => {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 ';
    case 'danger':
      return 'bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600 ';
    case 'info':
      return 'bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600';
    default:
      return 'bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600 ';
  }
};
