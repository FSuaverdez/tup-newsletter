import React, { useRef } from 'react';

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
  const textAreaRef = useRef();
  const auto_grow = element => {
    element.style.height = '5px';
    element.style.height = element.scrollHeight + 'px';
  };
  return (
    <div className={`${classes} `}>
      {label && (
        <label htmlFor='name' className='font-bold text-gray-600'>
          {label}:
        </label>
      )}
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
          ref={textAreaRef}
          className={`${classes} ${
            fullWidth && 'w-full'
          } block border-2 border-gray-500 rounded px-2 py-1 max-h-fit resize-none`}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          id={name}
          onChange={e => {
            handleChange(e);
            auto_grow(textAreaRef.current);
          }}
          value={value}
        />
      )}
    </div>
  );
};

export default Input;
