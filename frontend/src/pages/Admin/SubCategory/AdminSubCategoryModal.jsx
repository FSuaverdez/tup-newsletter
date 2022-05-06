import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddSubCategoryMutation } from '../../../app/services/subCategoryApi';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';

const AdminSubCategoryModal = ({
  handleCloseAdd,
  className: classes,
  categoryId,
}) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [addSubCategory] = useAddSubCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if (name && description) {
      await addSubCategory({ name, description, categoryId }).unwrap();
      navigate('/admin/category/edit/' + categoryId);
      setNameError(false);
      handleCloseAdd();
    } else {
      !name && setNameError(true);
      !description && setDescriptionError(true);
    }
  };

  return (
    <div
      className={`w-656 shadow-xl bg-white p-5 rounded ${classes}`}
      onClick={e => e.stopPropagation()}
    >
      <h1 className='text-2xl font-bold my-5'>Add Category</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <label htmlFor='name' className='font-bold text-gray-600'>
            Category Name:
          </label>
          <Input
            fullWidth
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
            required
          />
          {nameError && (
            <p className='text-red-500 text-sm'>Category Name is required.</p>
          )}
          <label htmlFor='name' className='font-bold text-gray-600'>
            Description:
          </label>
          <Input
            fullWidth
            type='textarea'
            name='name'
            onChange={e => setDescription(e.target.value)}
            value={description}
            required
          />
          {descriptionError && (
            <p className='text-red-500 text-sm'>Description is required.</p>
          )}
        </div>

        <div className='flex gap-2 justify-end'>
          <Button type='danger' onClick={handleCloseAdd}>
            Close
          </Button>
          <Button type='success' onClick={handleSubmit}>
            Create Subcategory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSubCategoryModal;
