import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetCategoryQuery,
  useGetCategoryUserPermissionsQuery,
} from '../../../../app/services/categoryApi';
import { useGetSubCategoriesByCategoryQuery } from '../../../../app/services/subCategoryApi';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import AdminSubCategoryModal from '../../SubCategory/AdminSubCategoryModal';

const ContentCategoryManage = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesByCategoryQuery(categoryId);
  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetCategoryUserPermissionsQuery({ id: categoryId });

  const navigate = useNavigate();

  if (isLoading && isSubCategoriesLoading && isUserPermissionsLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage {category?.name}</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Subcategories</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='Info'
              onClick={() => {
                navigate('all-categories');
              }}
            >
              View All
            </Button>
          </div>
          <div>
            {subCategories &&
              subCategories.slice(0, 5).map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c.name}</p>
                  <Link
                    to={`/admin/subcategory/edit/${c._id}`}
                    className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                  >
                    Edit
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage User Permissions</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='Info'
              onClick={() => {
                navigate('all-permissions');
              }}
            >
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCategoryManage;
