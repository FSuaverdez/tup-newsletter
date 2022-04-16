import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddCategoryMutation } from '../../../app/services/categoryApi';
import Button from '../../../components/Button/Button';

const AdminAddCategoryModal = ({ handleCloseAdd }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (name) {
      await addCategory({ name }).unwrap();
      navigate('/admin/category');
      setNameError(false);
      handleCloseAdd();
    } else {
      setNameError(true);
    }
  };

  return (
    <div
      className='w-656 shadow-xl bg-white p-5 rounded'
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Add Category</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <label htmlFor='name' className='font-bold text-gray-600'>
            Category Name:
          </label>
          <input
            className='w-full block border-2 border-gray-500 rounded px-2 py-1'
            type='text'
            name='name'
            id='name'
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
          {nameError && (
            <p className='text-red-500 text-sm'>Category Name is required.</p>
          )}
        </div>

        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseAdd}>
            Close
          </Button>
          <Button type='success' onClick={handleSubmit}>
            Create Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategoryModal;
