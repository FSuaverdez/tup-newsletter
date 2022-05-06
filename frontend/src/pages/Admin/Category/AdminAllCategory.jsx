import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../../app/services/categoryApi';
import { useGetSubCategoriesByCategoryQuery } from '../../../app/services/subCategoryApi';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import AdminSubCategoryModal from '../SubCategory/AdminSubCategoryModal';
const AdminAllCategory = () => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesByCategoryQuery(categoryId);
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();

  if (isLoading && isSubCategoriesLoading) {
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
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-2xl font-bold my-5'>Manage {category?.name}</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div>
          <h1 className='text-lg font-bold mt-5'>
            Manage All {category?.name} Subcategories
          </h1>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                handleOpenAdd();
              }}
            >
              Add Subcategory
            </Button>
          </div>
          <div>
            {subCategories &&
              subCategories.map(c => (
                <div
                  className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                  key={c._id}
                >
                  <p className='text-xl font-bold'>{c.name}</p>
                  <Link
                    to={`/admin/subcategory/edit/${c._id}`}
                    className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                  >
                    Edit
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      {openAdd && (
        <Modal handleClose={handleCloseAdd}>
          <AdminSubCategoryModal
            handleCloseAdd={handleCloseAdd}
            categoryId={categoryId}
            className='p-8'
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminAllCategory;
