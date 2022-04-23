import React from 'react';

const Input = ({
  type,
  className: classes,
  name,
  placeholder,
  isRequired,
  id,
  onChange: handleChange,
  fullWidth,
  value,
}) => {
  return (
    <>
      {type !== 'textarea' ? (
        <input
          type={type}
          className={`${classes} ${
            fullWidth && 'w-full'
          } block border-2 border-gray-500 rounded px-2 py-1`}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          id={name}
          onChange={handleChange}
          value={value}
        />
      ) : (
        <textarea
          type={type}
          className={`${classes} ${
            fullWidth && 'w-full'
          } block border-2 border-gray-500 rounded px-2 py-1`}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          id={name}
          onChange={handleChange}
          value={value}
          style={{ resize: 'none' }}
        />
      )}
    </>
  );
};

export default Input;
