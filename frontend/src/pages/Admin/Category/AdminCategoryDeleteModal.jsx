import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteCategoryMutation } from '../../../app/services/adminApi';
import { postApi } from '../../../app/services/postApi';
import Button from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';

const AdminCategoryDeleteModal = ({
  handleCloseDelete,
  category,
  className: classes,
}) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setCategoryId(category._id);
  }, [category]);

  const handleDelete = async () => {
    try {
      if (categoryId) {
        await deleteCategory({ categoryId }).unwrap();
        dispatch(postApi.util.invalidateTags(['Post']));
        navigate('/admin/category');
        handleCloseDelete();
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
      <h1 className='text-2xl font-bold my-5'>Delete Category</h1>
      <div className=' mx-auto'>
        <div className='py-3'>
          {`Are you sure you want to delete ${category.name}? All
                     of the sub categories and posts under it will also be deleted`}
        </div>
      </div>
      <div className='flex gap-2 justify-end'>
        <Button type='danger' onClick={handleCloseDelete}>
          Cancel
        </Button>
        <Button type='success' onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoryDeleteModal;
