import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddUserPermissionCategoryMutation,
  useEditUserPermissionCategoryMutation,
  useGetCategoryQuery,
  useGetCategoryUserPermissionsQuery,
  useRemoveUserPermissionCategoryMutation,
} from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Input from '../../../components/Input/Input';
import Loading from '../../../components/Loading/Loading';
import UserPermissionModal from './UserPermissionModal';

const AdminCategoryAllUserPermissions = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetCategoryUserPermissionsQuery({ id: categoryId });
  const [openAdd, setOpenAdd] = useState(false);
  const [addUserPermission] = useAddUserPermissionCategoryMutation();
  const [editUserPermission] = useEditUserPermissionCategoryMutation();
  const [removeUserPermission] = useRemoveUserPermissionCategoryMutation();
  const [search, setSearch] = useState('');
  const [userPermissionData, setUserPermissionData] = useState(null);
  const navigate = useNavigate();

  if (isLoading && isUserPermissionsLoading) {
    return <Loading />;
  }

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setUserPermissionData(null);
    setOpenAdd(false);
  };
  const handleSubmitUserPermission = async (
    email,
    role,
    handleError,
    handleSuccess,
    isEdit,
    id
  ) => {
    try {
      if (!isEdit) {
        await addUserPermission({
          email,
          role,
          categoryId,
        }).unwrap();
      } else {
        await editUserPermission({
          id,
          email,
          role,
          categoryId,
        });
      }

      handleSuccess();
    } catch (error) {
      handleError(error.data.message);
    }
  };

  const handleDeleteUserPermission = async id => {
    try {
      await removeUserPermission({ id, categoryId });
      setOpenAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUserPermissions = userPermissions?.filter(
    s =>
      s.user.name.toLowerCase().includes(search.toLowerCase()) ||
      s.user.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-2xl font-bold my-5'>Manage {category?.name}</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div>
          <h1 className='text-lg font-bold mt-5'>
            Manage All {category?.name} User Permissions
          </h1>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                handleOpenAdd();
              }}
            >
              Add User Permission
            </Button>
          </div>
          <div>
            <Input
              fullWidth
              className='p-5'
              placeholder='Search'
              onChange={e => setSearch(e.target.value)}
            />
            {filteredUserPermissions &&
              filteredUserPermissions.map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c?.user?.name}</p>
                  <p className='font-bold text-black'>{c?.role}</p>
                  <Button
                    type='info'
                    onClick={() => {
                      setUserPermissionData(c);
                      handleOpenAdd();
                    }}
                  >
                    Edit
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {openAdd && (
        <Modal handleClose={handleCloseAdd}>
          <UserPermissionModal
            handleCloseAdd={handleCloseAdd}
            categoryId={categoryId}
            className='p-8'
            handleSubmit={handleSubmitUserPermission}
            userPermissionData={userPermissionData}
            handleDelete={handleDeleteUserPermission}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminCategoryAllUserPermissions;
