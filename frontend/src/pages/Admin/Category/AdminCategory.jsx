import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../app/services/categoryApi';
import Modal from '../../../components/Modal/Modal';
import AdminAddCategoryModal from './AdminAddCategoryModal';

const AdminCategory = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  if (isCategoriesLoading) {
    return 'Loading...';
  }

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Category</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div className='flex items-center w-full justify-end mb-5'>
          <button
            className='bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600'
            onClick={() => {
              handleOpenAdd();
            }}
          >
            Add Category
          </button>
        </div>
        <div>
          {categories &&
            categories.map(c => (
              <div
                className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center'
                key={c._id}
              >
                <p className='text-xl font-bold'>{c.name}</p>
                <Link
                  to={`edit/${c._id}`}
                  className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                >
                  Edit
                </Link>
              </div>
            ))}
        </div>
      </div>
      {openAdd && (
        <Modal handleClose={handleCloseAdd}>
          <AdminAddCategoryModal handleCloseAdd={handleCloseAdd} />
        </Modal>
      )}
    </div>
  );
};

export default AdminCategory;
