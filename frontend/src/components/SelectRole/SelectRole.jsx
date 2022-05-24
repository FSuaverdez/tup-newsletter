import React from 'react';

const SelectRole = ({
  onChange: handleChange,
  className: classes,
  fullWidth,
  value,
  required,
}) => {
  return (
    <div className={`${classes} my-4`}>
      <label htmlFor='name' className='font-bold text-gray-600'>
        Role:
      </label>
      <select
        name='role'
        onChange={handleChange}
        value={value}
        className={`${classes} ${
          fullWidth && 'w-full'
        } block border-2 border-gray-500 rounded px-2 py-1`}
        required={required}
      >
        <option value='Admin'>Admin</option>
        <option value='Editor'>Editor</option>
      </select>
    </div>
  );
};

export default SelectRole;
