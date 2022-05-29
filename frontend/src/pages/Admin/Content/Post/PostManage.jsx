import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../../app/services/authApi';
import { useGetAllPostsQuery } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const PostManage = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllPostsQuery();

  if (isLoading) {
    return 'Loading....';
  }

  console.log(posts);
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage Posts</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Posts</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                navigate('create');
              }}
            >
              Create Post
            </Button>
            <Button
              type='Info'
              onClick={() => {
                navigate('all');
              }}
            >
              View All
            </Button>
          </div>
          <div>
            {posts &&
              posts.map(c => {
                if (user.isAdmin) {
                  return (
                    <div
                      className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                      key={c._id}
                    >
                      <p className='text-xl font-bold'>{c.title}</p>
                      <Link
                        to={`/content/post/${c._id}`}
                        className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                      >
                        View
                      </Link>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManage;
