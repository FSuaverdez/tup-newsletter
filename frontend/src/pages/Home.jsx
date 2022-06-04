import { Link } from 'react-router-dom';
import { useGetAllPostsQuery } from '../app/services/postApi';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold mb-10'>All Posts</h1>
        {posts?.map(post => {
          if (post.approved) {
            return (
              <Link to={`/post/${post._id}`} key={post._id}>
                <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                  <h2 className='text-xl font-bold'>{post.title}</h2>
                  <h2 className='font-normal'>{post.category.name}</h2>
                  <h2 className='text-xl'>{post?.subCategory?.name}</h2>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <div className='mt-5'>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={8}
          pageLinkClassName={'px-5 mx-2 hover:text-red-400'}
          previousLinkClassName={'uppercase text-xs mx-4 hover:text-red-400 '}
          nextLinkClassName={'uppercase text-xs mx-4 hover:text-red-400 '}
          activeClassName={'font-bold'}
          className={'flex justify-center items-center text-red-600 '}
          // onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
