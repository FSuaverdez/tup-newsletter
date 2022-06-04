import React from 'react';
import Select from 'react-select';
import { useGetSubCategoriesQuery } from '../../app/services/adminApi';

const SelectSubCategory = ({
  categoryId,
  value: stateValue,
  onChange: handleChange,
  disabled,
  className: classes,
  hideLabel,
}) => {
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();
  let options = [{ value: '', label: 'None' }];
  if (!isLoading) {
    if (categoryId) {
      options = [
        ...options,
        ...subCategories
          .filter(c => c.category === categoryId)
          .map(c => ({ ...c, value: c._id, label: c.name })),
      ];
    } else {
      options = [
        ...options,
        ...subCategories.map(c => ({ ...c, value: c._id, label: c.name })),
      ];
    }
  }

  return (
    <div className={`my-4 ${classes}`}>
      {!hideLabel && (
        <label htmlFor='name' className='font-bold text-gray-600'>
          Subcategory:
        </label>
      )}
      <Select
        classNamePrefix='react-select-container'
        options={options}
        value={stateValue}
        onChange={handleChange}
        isDisabled={disabled}
      />
    </div>
  );
};

export default SelectSubCategory;
