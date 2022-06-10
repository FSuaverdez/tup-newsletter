import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddCategoryMutation } from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Loading from '../../../components/Loading/Loading';
const AdminCategoryModal = ({ handleCloseAdd, className: classes }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [addCategory] = useAddCategoryMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (name && description) {
        setIsLoading(true)
        const data = await addCategory({ name, description }).unwrap();
        navigate('/admin/category');
        setNameError(false);
        data && setIsLoading(false);
        handleCloseAdd();
      } else {
        !name && setNameError(true);
        !description && setDescriptionError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Add Category</h1>
      <div className=' mx-auto'>
        {isLoading ? <Loading/>
          :
          <div className='py-3'>
            <label htmlFor='name' className='font-bold text-gray-600'></label>
            <Input
              fullWidth
              type='text'
              name='name'
              label='Category Name'
              onChange={e => setName(e.target.value)}
              value={name}
              required
            />
            {nameError && (
              <p className='text-red-500 text-sm'>Category Name is required.</p>
            )}
            <Input
              fullWidth
              type='textarea'
              name='name'
              label='Description'
              onChange={e => setDescription(e.target.value)}
              value={description}
              required
            />
            {descriptionError && (
              <p className='text-red-500 text-sm'>Description is required.</p>
            )}
          </div>
        }

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

export default AdminCategoryModal;
