import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useEditUserRoleMutation,
  useRemoveUserMutation,
} from '../../../../app/services/authApi';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import ConfirmDelete from './ConfirmDelete';

const EditUserModal = ({ handleCloseEdit, className: classes, user }) => {
  const [isAdmin, setIsAdmin] = useState(
    user?.isAdmin === true ? 'Super Admin' : 'User'
  );
  const [openDelete, setOpenDelete] = useState(false);
  const [editRole] = useEditUserRoleMutation();
  const [removeUser] = useRemoveUserMutation();

  const handleSubmit = async e => {
    const role = isAdmin === 'Super Admin' ? true : false;
    await editRole({ isAdmin: role, id: user?._id });
    handleCloseEdit();
  };

  const openDeleteModal = async e => {
    setOpenDelete(true);
  };
  const closeDeleteModal = async e => {
    setOpenDelete(false);
  };
  const handleDelete = async e => {
    await removeUser({ id: user?._id });
    closeDeleteModal();
    handleCloseEdit();
  };

  return (
    <div
      className={`w-656 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Update User</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <label htmlFor='name' className='font-bold text-gray-600'>
            User Role:
          </label>
          <select
            name='role'
            onChange={e => setIsAdmin(e.target.value)}
            value={isAdmin}
            className={`${classes} ${'w-full'} block border-2 border-gray-500 rounded px-2 py-1`}
          >
            <option value='Super Admin'>Super Admin</option>
            <option value='User'>User</option>
          </select>
        </div>

        <Button type='danger' onClick={openDeleteModal}>
          Delete User
        </Button>

        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseEdit}>
            Close
          </Button>

          <Button type='success' onClick={handleSubmit}>
            Update User
          </Button>
        </div>
      </div>
      {openDelete && (
        <Modal handleClose={closeDeleteModal}>
          <ConfirmDelete
            handleCloseEdit={closeDeleteModal}
            handleConfirm={handleDelete}
            user={user}
          />
        </Modal>
      )}
    </div>
  );
};

export default EditUserModal;
