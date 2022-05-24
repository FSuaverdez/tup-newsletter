import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  useGetSubCategoryQuery,
  useGetSubCategoryUserPermissionsQuery,
} from '../../../../app/services/subCategoryApi';
import Button from '../../../../components/Button/Button';

const ContentSubCategoryManagePosts = () => {
  const { subCategoryId } = useParams();
  const { data: subCategory, isLoading } = useGetSubCategoryQuery({
    id: subCategoryId,
  });

  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetSubCategoryUserPermissionsQuery({ id: subCategoryId });

  const navigate = useNavigate();

  if (isLoading && isUserPermissionsLoading) {
    return 'Loading...';
  }
  console.log(subCategory);
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>
        Manage {subCategory?.name} Posts
      </h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>
          {subCategory?.name}
        </h2>
        <p className='text-black '>{subCategory?.description}</p>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Posts</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                navigate('create');
              }}
            >
              Create Post
            </Button>
          </div>
          <div>
            {/* {subCategories &&
              subCategories.map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c.name}</p>
                  <Link
                    to={`/content/subcategory/${c._id}/manage`}
                    className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                  >
                    Manage
                  </Link>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentSubCategoryManagePosts;