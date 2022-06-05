import Button from '../../../components/Button/Button';

const ConfirmDeleteUserPermission = ({
  handleCloseEdit,
  className: classes,
  handleConfirm,
  userPermission,
}) => {
  return (
    <div
      className={`w-656 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Delete User Permissions</h1>
      <p>Do you want to delete this user permission ?</p>
      <div className=' mx-auto'>
        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseEdit}>
            Close
          </Button>

          <Button
            type='success'
            onClick={() => handleConfirm(userPermission._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteUserPermission;
