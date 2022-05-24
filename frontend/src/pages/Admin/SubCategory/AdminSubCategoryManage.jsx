import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetSubCategoryQuery,
  useAddUserPermissionMutation,
  useGetSubCategoryUserPermissionsQuery,
} from '../../../app/services/subCategoryApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import UserPermissionModal from '../Components/UserPermissionModal';

const AdminCategoryManage = () => {
  const { subCategoryId } = useParams();
  const { data: subCategory, isLoading } = useGetSubCategoryQuery({
    id: subCategoryId,
  });

  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetSubCategoryUserPermissionsQuery({ id: subCategoryId });
  const [openAddUserPermission, setOpenAddUserPermission] = useState(false);
  const [addUserPermission] = useAddUserPermissionMutation();
  const [userPermissionData, setUserPermissionData] = useState(null);
  const navigate = useNavigate();

  if (isLoading && isUserPermissionsLoading) {
    return 'Loading...';
  }

  const handleOpenAddUserPermission = () => {
    setOpenAddUserPermission(true);
  };
  const handleCloseAddUserPermission = () => {
    setUserPermissionData(null);
    setOpenAddUserPermission(false);
  };
  const handleSubmitUserPermission = async (email, role) => {
    await addUserPermission({ email, role, subCategoryId }).unwrap();
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage {subCategory?.name}</h1>
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
    </div>
  );
};

export default AdminCategoryManage;