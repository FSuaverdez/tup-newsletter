import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddUserPermissionMutation,
  useGetCategoryQuery,
} from '../../../app/services/categoryApi';
import { useGetSubCategoriesByCategoryQuery } from '../../../app/services/subCategoryApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import AddUserPermissionModal from '../Components/AddUserPermissionModal';
import AdminSubCategoryModal from '../SubCategory/AdminSubCategoryModal';

const AdminCategoryManage = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesByCategoryQuery(categoryId);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddUserPermission, setOpenAddUserPermission] = useState(false);
  const [addUserPermission] = useAddUserPermissionMutation();
  const navigate = useNavigate();

  if (isLoading && isSubCategoriesLoading) {
    return 'Loading...';
  }

  const handleOpenAddSubCategory = () => {
    setOpenAddCategory(true);
  };
  const handleCloseAddSubCategory = () => {
    setOpenAddCategory(false);
  };
  const handleOpenAddUserPermission = () => {
    setOpenAddUserPermission(true);
  };
  const handleCloseAddUserPermission = () => {
    setOpenAddUserPermission(false);
  };
  const handleSubmitUserPermission = async (email, role) => {
    await addUserPermission({ email, role, categoryId }).unwrap();
  };

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
              type='success'
              onClick={() => {
                handleOpenAddSubCategory();
              }}
            >
              Add Subcategory
            </Button>
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
              type='success'
              onClick={() => {
                handleOpenAddUserPermission();
              }}
            >
              Add User Permission
            </Button>
            <Button
              type='Info'
              onClick={() => {
                navigate('all-permissions');
              }}
            >
              View All
            </Button>
          </div>
          <div>
            {/* {subCategories &&
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
              ))} */}
          </div>
        </div>
      </div>

      {openAddCategory && (
        <Modal handleClose={handleCloseAddSubCategory}>
          <AdminSubCategoryModal
            handleCloseAdd={handleCloseAddSubCategory}
            categoryId={categoryId}
            className='p-8'
          />
        </Modal>
      )}
      {openAddUserPermission && (
        <Modal handleClose={handleCloseAddUserPermission}>
          <AddUserPermissionModal
            handleCloseAdd={handleCloseAddUserPermission}
            categoryId={categoryId}
            className='p-8'
            handleSubmit={handleSubmitUserPermission}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoryManage;
