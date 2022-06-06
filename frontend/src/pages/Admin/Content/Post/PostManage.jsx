import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../../app/services/authApi';
import { useGetAllPostsQuery } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';
import Loading from '../../../../components/Loading/Loading';

const PostManage = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const navigate = useNavigate();
  const { data: posts, isLoading } = useGetAllPostsQuery();
  if (isLoading) {
    return <Loading />;
  }

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
          </div>
          <div>
            <p className='text-xl text-green-500 font-bold'>Approved Posts</p>
            <div className='flex items-center w-full justify-end mb-5 gap-3'>
              <Button
                type='success'
                onClick={() => {
                  navigate('all/approved');
                }}
              >
                View All Approved Posts
              </Button>
            </div>
            {posts &&
              posts
                .filter(c => c.approved)
                .map(c => {
                  const show = data?.subCategoryPermissions?.find(p => {
                    const role = p.userPermissions.find(
                      p => user._id === p.user
                    ).role;

                    return (
                      p._id === c.subCategory?._id &&
                      (role === 'Admin' || role === 'Editor')
                    );
                  });
                  const show2 = data?.categoryPermissions?.find(p => {
                    const role = p.userPermissions.find(
                      p => user._id === p.user
                    ).role;

                    return (
                      p._id === c.category?._id &&
                      (role === 'Admin' || role === 'Editor')
                    );
                  });
                  if (show2 || show || user?.isAdmin) {
                    return (
                      <div key={c._id}>
                        <p className='text-m'>
                          {c.subCategory?.name
                            ? c.subCategory?.name
                            : c.category?.name}
                        </p>
                        <div className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'>
                          <p className='text-xl font-bold'>{c.title}</p>
                          <Link
                            to={`/content/post/${c._id}`}
                            className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
                .slice(0, 5)}
          </div>
          <div>
            <p className='text-xl text-rose-600 font-bold mt-10'>
              Pending Posts
            </p>
            <div className='flex items-center w-full justify-end mb-5 gap-3'>
              <Button
                type='danger'
                onClick={() => {
                  navigate('all/pending');
                }}
              >
                View All Pending Posts
              </Button>
            </div>
            {posts &&
              posts
                .filter(c => !c.approved)
                .map(c => {
                  const show = data?.subCategoryPermissions?.find(p => {
                    const role = p.userPermissions.find(
                      p => user._id === p.user
                    ).role;

                    return (
                      p._id === c.subCategory?._id &&
                      (role === 'Admin' || role === 'Editor')
                    );
                  });
                  const show2 = data?.categoryPermissions?.find(p => {
                    const role = p.userPermissions.find(
                      p => user._id === p.user
                    ).role;

                    return (
                      p._id === c.category?._id &&
                      (role === 'Admin' || role === 'Editor')
                    );
                  });
                  if (show || show2 || user?.isAdmin) {
                    return (
                      <div key={c._id}>
                        <p className='text-m'>
                          {c.subCategory?.name
                            ? c.subCategory?.name
                            : c.category?.name}
                        </p>
                        <div className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'>
                          <p className='text-xl font-bold'>{c.title}</p>
                          <Link
                            to={`/content/post/${c._id}`}
                            className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    );
                  }
                })
                .slice(0, 5)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManage;
