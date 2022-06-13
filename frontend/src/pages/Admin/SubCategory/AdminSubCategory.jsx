import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../app/services/authApi';
import { useGetSubCategoriesQuery } from '../../../app/services/adminApi';
import Modal from '../../../components/Modal/Modal';
import Loading from '../../../components/Loading/Loading';
import Input from '../../../components/Input/Input';
import AdminSubCategoryModal from './AdminSubCategoryModal';

const AdminSubCategory = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const [search, setSearch] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery();
  if (isSubCategoriesLoading) {
    return <Loading />;
  }

  const handleOpenAddSubCategory = () => {
    setOpenAdd(true);
  };
  const handleCloseAddSubCategory = () => {
    setOpenAdd(false);
  };

  const filteredSubCategories = subCategories?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Subcategories</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div className='flex items-center w-full justify-end mb-5'>
          {user?.isAdmin&&<button
            className='bg-green-500 text-white rounded py-2 px-3 hover:bg-green-600'
            onClick={() => {
              handleOpenAddSubCategory();
            }}
          >
            Add Subcategory
          </button>}
        </div>
        <div>
          <Input
            fullWidth
            className='p-5'
            placeholder='Search'
            onChange={e => setSearch(e.target.value)}
          />
          {filteredSubCategories &&
            filteredSubCategories.map(c => {
              const show = data?.subCategoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;

                return p._id === c._id && role === 'Admin';
              });
              const show2 = data?.categoryPermissions?.find(p => {
                const role = p.userPermissions.find(
                  p => user._id === p.user
                ).role;

                return p._id === c.category && role === 'Admin';
              });

              if (user.isAdmin || show || show2) {
                return (
                  <div
                    className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                    key={c._id}
                  >
                    <p className='font-bold'>{c.name}</p>
                    <Link
                      to={`edit/${c._id}`}
                      className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                    >
                      Edit
                    </Link>
                  </div>
                );
              }
              return null;
            })}
        </div>
      </div>
      {openAdd && (
        <Modal handleClose={handleCloseAddSubCategory}>
          <AdminSubCategoryModal
            handleCloseAdd={handleCloseAddSubCategory}
            className='p-8'
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminSubCategory;
