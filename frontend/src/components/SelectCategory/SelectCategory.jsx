import React from 'react';
import Select from 'react-select';
import { useGetCategoriesQuery } from '../../app/services/adminApi';

const SelectCategory = ({
  value: stateValue,
  onChange: handleChange,
  disabled,
  hideLabel,
  className: classes,
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  let options = [{ value: '', label: 'None' }];

  if (!isLoading) {
    options = [
      ...options,
      ...categories.map(c => ({ ...c, value: c._id, label: c.name })),
    ];
  }

  return (
    <div className={`mb-3 ${classes}`}>
      {!hideLabel && (
        <label htmlFor='name' className='font-bold text-gray-600'>
          Category:
        </label>
      )}
      <Select
        options={options}
        value={stateValue}
        onChange={handleChange}
        isDisabled={disabled}
      />
    </div>
  );
};

export default SelectCategory;
