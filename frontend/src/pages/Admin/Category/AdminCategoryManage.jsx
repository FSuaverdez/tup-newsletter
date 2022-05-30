import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../app/services/authApi';
import {
  useAddUserPermissionCategoryMutation,
  useGetCategoryQuery,
  useGetCategoryUserPermissionsQuery,
  useGetSubCategoriesByCategoryQuery,
} from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import UserPermissionModal from '../Components/UserPermissionModal';
import AdminSubCategoryModal from '../SubCategory/AdminSubCategoryModal';
import AdminEditCategoryModal from './AdminEditCategoryModal';

const AdminCategoryManage = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesByCategoryQuery(categoryId);
  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetCategoryUserPermissionsQuery({ id: categoryId });
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openAddUserPermission, setOpenAddUserPermission] = useState(false);
  const [addUserPermission] = useAddUserPermissionCategoryMutation();
  const [userPermissionData, setUserPermissionData] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  if (isLoading && isSubCategoriesLoading && isUserPermissionsLoading) {
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
    setUserPermissionData(null);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleSubmitUserPermission = async (email, role) => {
    await addUserPermission({ email, role, categoryId }).unwrap();
  };

  const showAddPermission =
    data?.categoryPermissions
      ?.find(p => p._id === category?._id)
      ?.userPermissions.find(p => p?.user === user?._id).role === 'Admin';
  const isCategoryAdmin =
    data?.categoryPermissions
      ?.find(p => p._id === category?._id)
      ?.userPermissions.find(p => p?.user === user?._id).role === 'Admin';

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage {category?.name}</h1>
      {user?.isAdmin || isCategoryAdmin ? (
        <div className='w-full justify-end mb-5 gap-3'>
          <Button
            type='success'
            onClick={() => {
              handleOpenEdit();
            }}
          >
            Update Category
          </Button>
        </div>
      ) : null}
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div className='border-t-2 border-black mt-10'>
          {user?.isAdmin || isCategoryAdmin ? (
            <>
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
                    navigate('all-subcategories');
                  }}
                >
                  View All
                </Button>
              </div>
            </>
          ) : null}
          <div>
            {subCategories &&
              subCategories.slice(0, 5).map(c => {
                const show = data?.subCategoryPermissions.find(
                  p => p._id === c._id
                );

                console.log(isCategoryAdmin);
                if (user.isAdmin || show || isCategoryAdmin) {
                  return (
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
                  );
                }
                return null;
              })}
          </div>
        </div>
        {user.isAdmin || showAddPermission ? (
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
              {userPermissions &&
                userPermissions.slice(0, 5).map(c => (
                  <div
                    className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                    key={c._id}
                  >
                    <p className='font-bold'>{c?.user?.name}</p>
                    <p className='font-bold text-black'>{c?.role}</p>
                    <Button
                      type='info'
                      onClick={() => {
                        setUserPermissionData(c);
                        handleOpenAddUserPermission();
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
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
          <UserPermissionModal
            handleCloseAdd={handleCloseAddUserPermission}
            categoryId={categoryId}
            className='p-8'
            handleSubmit={handleSubmitUserPermission}
            userPermissionData={userPermissionData}
          />
        </Modal>
      )}
      {openEdit && (
        <Modal handleClose={handleCloseEdit}>
          <AdminEditCategoryModal
            handleCloseEdit={handleCloseEdit}
            category={category}
            className='p-8'
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoryManage;
