import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAddCategoryMutation } from '../app/services/categoryApi';

const AdminAddCategory = () => {
  const [name, setName] = useState('');
  const [addCategory] = useAddCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (name) {
      const response = await addCategory({ name }).unwrap();
      navigate('/admin/category');
    }
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Add Category</h1>
      <div className='shadow-xl bg-white p-5 rounded' onSubmit={handleSubmit}>
        <Link to='/admin/category'>Go Back</Link>
        <div className='max-w-md mx-auto'>
          <div className='py-3'>
            <label htmlFor='name' className='font-bold text-gray-600'>
              Category Name:
            </label>
            <input
              className='max-w-xl w-full block border-2 border-gray-500 rounded px-2 py-1'
              type='text'
              name='name'
              id='name'
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <button
            className='bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600 mt-5'
            onClick={handleSubmit}
          >
            Create Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
