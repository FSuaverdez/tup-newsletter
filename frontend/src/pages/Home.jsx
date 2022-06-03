import { Link } from 'react-router-dom';
import { useGetAllPostsQuery } from '../app/services/postApi';

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
    </div>
  );
};

export default Home;
