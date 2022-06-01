import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';

const ConfirmDelete = ({
  handleCloseEdit,
  className: classes,
  handleConfirm,
  user,
}) => {
  return (
    <div
      className={`w-656 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Delete User</h1>
      <p>Do you want to delete user {user?.name} ?</p>
      <div className=' mx-auto'>
        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseEdit}>
            Close
          </Button>

          <Button type='success' onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
