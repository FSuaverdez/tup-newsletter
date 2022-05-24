import React from 'react';

const Input = ({
  type,
  className: classes,
  name,
  placeholder,
  isRequired,
  onChange: handleChange,
  fullWidth,
  value,
  label,
}) => {
  return (
    <div className={`${classes} mb-2`}>
      <label htmlFor='name' className='font-bold text-gray-600'>
        {label}:
      </label>
      {type !== 'textarea' ? (
        <input
          type={type}
          className={`${
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
    </div>
  );
};

export default Input;
