import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../app/services/authApi';
import {
  useGetSubCategoryQuery,
  useAddUserPermissionSubCategoryMutation,
  useGetSubCategoryUserPermissionsQuery,
} from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import UserPermissionModal from '../Components/UserPermissionModal';
import AdminEditSubCategoryModal from './AdminEditSubCategoryModal';
import AdminDeleteSubCategoryModal from './AdminDeleteSubCategoryModal';

const AdminCategoryManage = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const { subCategoryId } = useParams();
  const { data: subCategory, isLoading } = useGetSubCategoryQuery({
    id: subCategoryId,
  });

  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetSubCategoryUserPermissionsQuery({ id: subCategoryId });
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAddUserPermission, setOpenAddUserPermission] = useState(false);
  const [addUserPermission] = useAddUserPermissionSubCategoryMutation();
  const [userPermissionData, setUserPermissionData] = useState(null);
  const navigate = useNavigate();

  if (isLoading && isUserPermissionsLoading) {
    return 'Loading...';
  }
  const handleOpenEditSubCategory = () => {
    setOpenEdit(true);
  };
  const handleCloseEditSubCategory = () => {
    setOpenEdit(false);
  };
  const handleOpenAddUserPermission = () => {
    setOpenAddUserPermission(true);
  };
  const handleOpenDeleteSubCategory = () => {
    setOpenDelete(true);
  };
  const handleCloseDeleteSubCategory = () => {
    setOpenDelete(false);
  };
  const handleCloseAddUserPermission = () => {
    setUserPermissionData(null);
    setOpenAddUserPermission(false);
  };
  const handleSubmitUserPermission = async (
    email,
    role,
    handleError,
    handleSuccess
  ) => {
    try {
      await addUserPermission({ email, role, subCategoryId }).unwrap();
      handleSuccess();
    } catch (error) {
      handleError(error.data.message);
    }
  };

  const showAddPermission =
    data?.subCategoryPermissions
      ?.find(p => p._id === subCategory?._id)
      ?.userPermissions.find(p => p?.user === user?._id).role === 'Admin';

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage {subCategory?.name}</h1>
      <div className='flex items-center w-full justify-end mb-5 gap-3'>
        <button
          className='bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600'
          onClick={() => {
            handleOpenEditSubCategory();
          }}
        >
          Update Sub Category
        </button>
        <button
          className='bg-red-500 text-white rounded py-2 px-3 hover:bg-red-600'
          onClick={() => {
            handleOpenDeleteSubCategory();
          }}
        >
          Delete Sub Category
        </button>
      </div>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
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
            {user.isAdmin || showAddPermission
              ? userPermissions?.slice(0, 5).map(c => (
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
                ))
              : null}
          </div>
        </div>
      </div>
      {openAddUserPermission && (
        <Modal handleClose={handleCloseAddUserPermission}>
          <UserPermissionModal
            handleCloseAdd={handleCloseAddUserPermission}
            categoryId={subCategoryId}
            className='p-8'
            handleSubmit={handleSubmitUserPermission}
            userPermissionData={userPermissionData}
          />
        </Modal>
      )}
      {openEdit && (
        <Modal handleClose={handleCloseEditSubCategory}>
          <AdminEditSubCategoryModal
            handleCloseEdit={handleCloseEditSubCategory}
            subCategory={subCategory}
            className='p-8'
          />
        </Modal>
      )}
      {openDelete && (
        <Modal handleClose={handleCloseDeleteSubCategory}>
          <AdminDeleteSubCategoryModal
            handleCloseDeleteSubCategory={handleCloseDeleteSubCategory}
            subCategory={subCategory}
            className='p-8'
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoryManage;
