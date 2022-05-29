import { useState } from 'react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import SelectRole from '../../../components/SelectRole/SelectRole';

const UserPermissionModal = ({
  handleCloseAdd,
  className: classes,
  handleSubmit: handleAdd,
  userPermissionData,
}) => {
  const [email, setEmail] = useState(userPermissionData?.user?.email || '');
  const [emailError, setEmailError] = useState(false);
  const [role, setRole] = useState(userPermissionData?.role || 'Admin');
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

export default UserPermissionModal;
