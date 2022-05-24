import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button/Button';

const PostManage = () => {
  const navigate = useNavigate();
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
        </div>
      </div>
    </div>
  );
};

export default PostManage;
