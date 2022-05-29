import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../../app/services/authApi';
import { useGetSubCategoriesQuery } from '../../../../app/services/subCategoryApi';

const ContentSubCategory = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesQuery();
  if (isSubCategoriesLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Categories</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div>
          {subCategories &&
            subCategories.map(c => {
              const show = data?.subCategoryPermissions.find(
                p => p._id === c._id
              );
              if (user.isAdmin || show) {
                return (
                  <div
                    className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                    key={c._id}
                  >
                    <p className='font-bold'>{c.name}</p>
                    <Link
                      to={`${c._id}`}
                      className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                    >
                      Manage
                    </Link>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ContentSubCategory;
