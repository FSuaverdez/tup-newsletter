import { Link } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../../app/services/categoryApi';

const ContentCategory = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  if (isCategoriesLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <h1 className='text-2xl font-bold my-5'>Manage Categories</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div>
          {categories &&
            categories.map(c => (
              <div
                className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                key={c._id}
              >
                <p className='font-bold'>{c.name}</p>
                <Link
                  to={`manage/${c._id}`}
                  className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                >
                  Manage
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCategory;
