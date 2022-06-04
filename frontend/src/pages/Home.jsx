import { Link } from 'react-router-dom';
import { useGetAllPostsQuery } from '../app/services/postApi';
import ReactPaginate from "react-paginate";

const Home = () => {
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold mb-10'>All Posts</h1>
        {posts?.map(post =>{ if (post.approved) {
          return(
            <Link to={`/post/${post._id}`} key={post._id}>
              <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                <h2 className='text-xl font-bold'>{post.title}</h2>
                <h2 className='font-normal'>{post.category.name}</h2>
                <h2 className='text-xl'>{post?.subCategory?.name}</h2>
              </div>
            </Link>
        )}})}
      </div>
      <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                pageCount={8}
                containerClassName={''}
                breakClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                breakLinkClassName={'page-link'}
                className = {'flex items-center text-rose-600 border-4 border-orange-600'}
                // onPageChange={handlePageChange}
          />
    </div>
  );
};

export default Home;
