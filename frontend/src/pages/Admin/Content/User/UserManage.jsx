import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../../../../app/services/authApi';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Modal from '../../../../components/Modal/Modal';
import Loading from '../../../../components/Loading/Loading';
import EditUserModal from './EditUserModal';

const UserManage = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState('');
  if (isLoading) {
    return <Loading />;
  }

  const handleOpenModal = user => {
    setUserData(user);
    setIsOpen(true);
  };

  const handleCloseModal = user => {
    setUserData(null);
    setIsOpen(false);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Users</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <Input
          fullWidth
          className='p-5'
          placeholder='Search'
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          {filteredUsers &&
            filteredUsers.map(c => (
              <div
                className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                key={c._id}
              >
                <div>
                  <p className='font-bold'>{c.name}</p>
                  <p className='text-xs'>{c.email}</p>
                </div>
                <p>{c.isAdmin ? 'Super Admin' : 'User'}</p>
                <Button onClick={() => handleOpenModal(c)}>Edit</Button>
              </div>
            ))}
        </div>
      </div>
      {isOpen && (
        <Modal handleClose={handleCloseModal}>
          <EditUserModal handleCloseEdit={handleCloseModal} user={userData} />
        </Modal>
      )}
    </div>
  );
};

export default UserManage;
