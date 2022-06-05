import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Modal from '../../../components/Modal/Modal';
import SelectRole from '../../../components/SelectRole/SelectRole';
import ConfirmDeleteUserPermission from './ConfirmDeleteUserPermission';

const UserPermissionModal = ({
  handleCloseAdd,
  className: classes,
  handleSubmit: handleAdd,
  userPermissionData,
  handleDelete,
}) => {
  const [email, setEmail] = useState(userPermissionData?.user?.email || '');
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState(userPermissionData?.role || 'Admin');
  const [roleError, setRoleError] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  console.log(userPermissionData);
  const handleError = message => {
    console.log(message);
    setErrorMessage(message);
  };

  const handleSuccess = () => {
    handleCloseAdd();
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      if (email && role) {
        setEmailError(false);
        setRoleError(false);
        setErrorMessage('');
        handleAdd(email, role, handleError, handleSuccess);
      } else {
        !email && setEmailError(true);
        !role && setRoleError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDeleteModal = async e => {
    setOpenDelete(true);
  };
  const closeDeleteModal = async e => {
    setOpenDelete(false);
  };

  const handleDeleteUserPermission = id => {
    handleDelete(id);
    closeDeleteModal();
  };

  return (
    <div
      className={`lg:w-656  sm:w-340shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Add User Permission</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <Input
            fullWidth
            type='email'
            name='email'
            label='Email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
          {emailError && (
            <p className='text-red-500 text-sm'>Email is required.</p>
          )}
          {errorMessage && (
            <p className='text-red-500 text-sm'>{errorMessage}</p>
          )}
          <SelectRole
            fullWidth
            name='name'
            onChange={e => setRole(e.target.value)}
            value={role}
            required
          />
          {roleError && (
            <p className='text-red-500 text-sm'>Role is required.</p>
          )}
          {userPermissionData?._id && (
            <Button type='danger' onClick={() => openDeleteModal()}>
              Delete
            </Button>
          )}
        </div>

        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseAdd}>
            Close
          </Button>
          <Button type='success' onClick={handleSubmit}>
            Add User Permission
          </Button>
        </div>
      </div>
      {openDelete && (
        <Modal handleClose={closeDeleteModal}>
          <ConfirmDeleteUserPermission
            handleCloseEdit={closeDeleteModal}
            handleConfirm={handleDeleteUserPermission}
            userPermission={userPermissionData}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserPermissionModal;
