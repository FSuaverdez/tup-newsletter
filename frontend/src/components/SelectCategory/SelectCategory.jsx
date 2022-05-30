import React from 'react';
import Select from 'react-select';
import { useGetCategoriesQuery } from '../../app/services/adminApi';

const SelectCategory = ({
  value: stateValue,
  onChange: handleChange,
  disabled,
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  let options = [];

  if (!isLoading) {
    options = categories.map(c => ({ ...c, value: c._id, label: c.name }));
  }

  return (
    <div className='mb-3'>
      <label htmlFor='name' className='font-bold text-gray-600'>
        Category:
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

export default SelectCategory;
