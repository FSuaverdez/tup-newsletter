import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../../../../app/services/authApi';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Loading from '../../../../components/Loading/Loading';
import EditUserModal from './EditUserModal';

const UserManage = () => {
  const { data: categories, isLoading } = useGetAllUsersQuery();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
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

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Users</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div>
          {categories &&
            categories.map(c => (
              <div
                className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                key={c._id}
              >
                <p className='font-bold'>{c.name}</p>
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
