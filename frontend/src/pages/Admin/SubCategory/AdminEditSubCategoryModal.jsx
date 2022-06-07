import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditSubCategoryMutation } from '../../../app/services/adminApi';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { useSelector } from 'react-redux';
import SelectCategory from '../../../components/SelectCategory/SelectCategory';

const AdminEditSubCategoryModal = ({
  handleCloseEdit,
  subCategory,
  className: classes,
}) => {
  const [name, setName] = useState('');
  const [subCategoryId, setSubCategoryid] = useState('');
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [editSubCategory] = useEditSubCategoryMutation();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  useEffect(() => {
    const setCurrent = () => {
      setName(subCategory.name);
      setDescription(subCategory.description);
      setSubCategoryid(subCategory._id);
    };
    setCurrent();
  }, [subCategory]);
  const [category, setCategory] = useState({
    value: subCategory.category._id,
    label: subCategory.category.name,
  });
  const handleCategoryChange = e => {
    setCategory(e);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (name && description) {
      await editSubCategory({
        name,
        description,
        subCategoryId,
        categoryId: category.value,
      }).unwrap();
      navigate('/admin/subcategory/edit/' + subCategoryId);
      setNameError(false);
      handleCloseEdit();
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
      <h1 className='text-2xl font-bold my-5'>Update Sub Category</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          <SelectCategory value={category} onChange={handleCategoryChange} />
          <label htmlFor='name' className='font-bold text-gray-600'>
            Sub Category Name:
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
          <Button type='danger' onClick={handleCloseEdit}>
            Close
          </Button>
          <Button type='success' onClick={handleSubmit}>
            Update Subcategory
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditSubCategoryModal;
