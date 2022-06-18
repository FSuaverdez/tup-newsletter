import React from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useGetSubCategoriesQuery } from '../../app/services/adminApi';
import { useGetPermissionsQuery } from '../../app/services/authApi';

const SelectSubCategory = ({
  categoryId,
  value: stateValue,
  onChange: handleChange,
  disabled,
  className: classes,
  hideLabel,
  requirePermission,
}) => {
  const { data: subCategories, isLoading } = useGetSubCategoriesQuery();
  const user = useSelector(state => state.user);
  const { data: userPermissions, isLoading: isLoading2 } =
    useGetPermissionsQuery(user?._id, {
      skip: !user,
    });
  let options = [{ value: '', label: 'None' }];
  if (!isLoading && !isLoading2) {
    if (categoryId) {
      if (requirePermission && !user?.isAdmin) {
        options = [
          ...options,
          ...subCategories
            .filter(c => {
              const show = userPermissions?.subCategoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;
                return (
                  p._id === c.category &&
                  (role === 'Admin' || role === 'Editor')
                );
              });
              const show2 = userPermissions?.categoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;
                return (
                  p._id === c.category &&
                  (role === 'Admin' || role === 'Editor')
                );
              });
              return show || show2;
            })
            .map(c => ({ ...c, value: c._id, label: c.name })),
        ];
      } else {
        options = [
          ...options,
          ...subCategories
            .filter(c => c.category === categoryId)
            .map(c => ({ ...c, value: c._id, label: c.name })),
        ];
      }
    } else {
      if (requirePermission && !user?.isAdmin) {
        options = [
          ...options,
          ...subCategories
            .filter(c => {
              const show = userPermissions?.subCategoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;

                return (
                  p._id === c._id && (role === 'Admin' || role === 'Editor')
                );
              });
              const show2 = userPermissions?.categoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;

                return (
                  p._id === c.category &&
                  (role === 'Admin' || role === 'Editor')
                );
              });
              return show || show2;
            })
            .map(c => ({ ...c, value: c._id, label: c.name })),
        ];
      } else {
        options = [
          ...options,
          ...subCategories.map(c => ({
            ...c,
            value: c._id,
            label: c.name,
          })),
        ];
      }
    }
  }

  return (
    <div className={`${classes}`}>
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
