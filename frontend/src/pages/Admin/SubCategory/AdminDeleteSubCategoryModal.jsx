import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDeleteSubCategoryMutation } from '../../../app/services/adminApi';
import { postApi } from '../../../app/services/postApi';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button/Button';

const AdminDeleteSubCategoryModal = ({
  handleCloseDeleteSubCategory,
  subCategory,
  className: classes,
}) => {
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const navigate = useNavigate();
  const [subCategoryId, setSubCategoryId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setSubCategoryId(subCategory._id);
    setCategoryId(subCategory.category._id);
  }, [subCategory]);

  const handleDelete = async () => {
    try {
      if (subCategoryId) {
        setIsLoading(true);
        const data = await deleteSubCategory({ subCategoryId }).unwrap();
        dispatch(postApi.util.invalidateTags(['Post']));
        data && setIsLoading(false);
        !isLoading && navigate('/admin/category/edit/' + categoryId);
        handleCloseDeleteSubCategory();
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
          {`Are you sure you want to delete ${subCategory.name}? All
                    of the posts under it will also be deleted.`}
        </div>
      </div>
      <div className='flex gap-2 justify-end'>
        <Button type='danger' onClick={handleCloseDeleteSubCategory}>
          Cancel
        </Button>
        <Button type='success' onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default AdminDeleteSubCategoryModal;
