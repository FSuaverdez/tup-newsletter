import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

const AddUserPermissionModal = ({
  handleCloseAdd,
  className: classes,
  handleSubmit: handleAdd,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [role, setRole] = useState('');
  const [roleError, setRoleError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    try {
      if (email && role) {
        handleAdd(email, role);
        setEmailError(false);
        setRoleError(false);
        handleCloseAdd();
      } else {
        !email && setEmailError(true);
        !role && setRoleError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-656 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Add User Permission</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <label htmlFor='name' className='font-bold text-gray-600'>
            User Email:
          </label>
          <Input
            fullWidth
            type='email'
            name='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
          {emailError && (
            <p className='text-red-500 text-sm'>Email is required.</p>
          )}
          <label htmlFor='name' className='font-bold text-gray-600'>
            Description:
          </label>
          <Input
            fullWidth
            type='textarea'
            name='name'
            onChange={e => setRole(e.target.value)}
            value={role}
            required
          />
          {roleError && (
            <p className='text-red-500 text-sm'>Rle is required.</p>
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
    </div>
  );
};

export default AddUserPermissionModal;
