import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../../app/services/authApi';
import { useGetCategoriesQuery } from '../../../../app/services/adminApi';
import Loading from '../../../../components/Loading/Loading';
import Input from '../../../../components/Input/Input';
import { useState } from 'react';

const ContentCategory = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const [search, setSearch] = useState('');
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  if (isCategoriesLoading) {
    return <Loading />;
  }

  const filteredCategories = categories?.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Categories</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div>
          <Input
            fullWidth
            className='p-5'
            placeholder='Search'
            onChange={e => setSearch(e.target.value)}
          />
          {filteredCategories &&
            filteredCategories.map(c => {
              const show = data?.categoryPermissions.find(p => p._id === c._id);
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
              return null;
            })}
        </div>
      </div>
    </div>
  );
};

export default ContentCategory;
