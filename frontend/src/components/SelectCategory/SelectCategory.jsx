import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useGetCategoriesQuery } from '../../app/services/adminApi';
import { useGetPermissionsQuery } from '../../app/services/authApi';

const SelectCategory = ({
  value: stateValue,
  onChange: handleChange,
  disabled,
  hideLabel,
  className: classes,
  requirePermission,
}) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const user = useSelector(state => state.user);
  const { data: userPermissions, isLoading: isLoading2 } =
    useGetPermissionsQuery(user?._id, {
      skip: !user,
    });
  let options = [{ value: '', label: 'None' }];

  if (!isLoading && !isLoading2) {
    if (requirePermission && !user?.isAdmin) {
      options = [
        ...options,
        ...userPermissions.categoryPermissions.map(c => ({
          ...c,
          value: c._id,
          label: c.name,
        })),
      ];
    } else {
      options = [
        ...options,
        ...categories.map(c => ({ ...c, value: c._id, label: c.name })),
      ];
    }
  }
  return (
    <div className={`${classes}`}>
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
