import React from 'react';
import Select from 'react-select';

const SelectPostType = ({
  value: stateValue,
  onChange: handleChange,
  disabled,
  className: classes,
}) => {
  let options = [
    { value: 'post', label: 'Post' },
    { value: 'live', label: 'Live' },
  ];

  return (
    <div className={`${classes} my-4`}>
      <label htmlFor='name' className='font-bold text-gray-600'>
        Post Type:
      </label>
      <Select
        options={options}
        value={stateValue}
        onChange={handleChange}
        isDisabled={disabled}
      />
    </div>
  );
};

export default SelectPostType;
