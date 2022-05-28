import React from 'react';

const Button = ({
  type,
  onClick: handleClick,
  children,
  className: classes,
  disabled,
}) => {
  let buttonClass = getButtonClass(type);

  return (
    <button
      className={`${buttonClass} ${classes} ${
        disabled && 'hover:cursor-not-allowed'
      } `}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

const getButtonClass = type => {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 disabled:bg-green-400 ';
    case 'danger':
      return 'bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600 disabled:bg-red-400';
    case 'info':
      return 'bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600 disabled:bg-cyan-400';
    default:
      return 'bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600 disabled:bg-red-400';
  }
};
