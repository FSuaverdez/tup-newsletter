import React from 'react';
import Select from 'react-select';
import { useGetSubCategoriesQuery } from '../../app/services/subCategoryApi';

const SelectSubCategory = ({
  categoryId,
  value: stateValue,
  onChange: handleChange,
  disabled,
}) => {
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();
  let options = [];
  if (!isLoading) {
    if (categoryId) {
      options = subCategories
        .filter(c => c.category === categoryId)
        .map(c => ({ ...c, value: c._id, label: c.name }));
    } else {
      options = subCategories.map(c => ({ ...c, value: c._id, label: c.name }));
    }
  }

  return (
    <div>
      <label htmlFor='name' className='font-bold text-gray-600'>
        Subcategory:
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

export default SelectSubCategory;
