import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddUserPermissionMutation,
  useGetCategoryQuery,
  useGetCategoryUserPermissionsQuery,
} from '../../../app/services/categoryApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import AddUserPermissionModal from './AddUserPermissionModal';
const AdminAllUserPermissions = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: userPermissions, isLoading: isUserPermissionsLoading } =
    useGetCategoryUserPermissionsQuery({ id: categoryId });
  const [openAdd, setOpenAdd] = useState(false);
  const [addUserPermission] = useAddUserPermissionMutation();
  const navigate = useNavigate();

  if (isLoading && isUserPermissionsLoading) {
    return 'Loading...';
  }

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleSubmitUserPermission = async (email, role) => {
    await addUserPermission({ email, role, categoryId }).unwrap();
  };

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
              Add Subcategory
            </Button>
          </div>
          <div>
            {userPermissions &&
              userPermissions.map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c?.user?.name}</p>
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
      </div>
      {openAdd && (
        <Modal handleClose={handleCloseAdd}>
          <AddUserPermissionModal
            handleCloseAdd={handleCloseAdd}
            categoryId={categoryId}
            className='p-8'
            handleSubmit={handleSubmitUserPermission}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminAllUserPermissions;
