import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPermissionsQuery } from '../../../../app/services/authApi';
import {
  useGetCategoryQuery,
  useGetSubCategoriesByCategoryQuery,
} from '../../../../app/services/adminApi';
import { useGetAllPostsQuery } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const ContentCategoryManage = () => {
  const user = useSelector(state => state.user);
  const { data } = useGetPermissionsQuery(user?._id, {
    skip: !user,
  });
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: subCategories, isLoading: isSubCategoriesLoading } =
    useGetSubCategoriesByCategoryQuery(categoryId);
  const { data: posts, isLoading: isPostsLoading } = useGetAllPostsQuery();
  const checker = categoryId;
  const navigate = useNavigate();

  if (isLoading && isSubCategoriesLoading && isPostsLoading) {
    return 'Loading...';
  }
  const filteredPost = posts?.filter(post => post.category._id === categoryId);
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>Manage {category?.name}</h1>
      <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='success'
              onClick={() => {
                navigate('/content/post/create/'+checker);
              }}
            >
              Create Post
            </Button>
          </div>
        <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Subcategories</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
            <Button
              type='Info'
              onClick={() => {
                navigate('all-subcategories');
              }}
            >
              View All
            </Button>
          </div>
          <div>
            {subCategories &&
              subCategories.slice(0, 5).map(c => {
                const show = data?.subCategoryPermissions.find(
                  p => p._id === c._id
                );
                const isCategoryAdmin =
                  data?.categoryPermissions
                    ?.find(p => p._id === category?._id)
                    ?.userPermissions.find(p => p?.user === user?._id).role ===
                  'Admin';
                if (user.isAdmin || show || isCategoryAdmin) {
                  return (
                    <div
                      className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                      key={c._id}
                    >
                      <p className='text-xl font-bold'>{c.name}</p>
                      <Link
                        to={`/content/subcategory/${c._id}`}
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
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Posts</h2>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
          </div>
          <div>
            <p className='text-xl font-bold mt-10 mb-5 text-green-500'>Approved Posts</p>
            <div className='flex items-center w-full justify-end mb-5 gap-3'>
              <Button
                type='success'
                onClick={() => {
                  navigate('all-posts/approved');
                }}
              >
                View All Approved Posts
              </Button>
            </div>
            {filteredPost &&
              filteredPost.slice(0, 5).map(c => {
                const show = data?.categoryPermissions?.find(p => {
                  const role = p.userPermissions.find(
                    p => user._id === p.user
                  ).role;
                  return (
                    p._id === c.category._id &&
                    (role === 'Admin' || role === 'Editor')
                  );
                });
                if ((user.isAdmin || show) && c.approved ) {
                  return (
                    <div key={c._id}>
                      <p className='text-m'>{c.subCategory ? c.subCategory.name : c.category.name}</p>
                      <div
                        className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                      >
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
                return null;
              })}
          </div>
          <div>
          <p className='text-xl font-bold mt-10 mb-5 text-rose-600'>Pending Posts</p>
          <div className='flex items-center w-full justify-end mb-5 gap-3'>
              <Button
                type='danger'
                onClick={() => {
                  navigate('all-posts/pending');
                }}
              >
                View All Pending Posts
              </Button>
            </div>
            {filteredPost && 
              filteredPost.slice(0, 5).map(e => {
                const show = data?.categoryPermissions?.find(u => {
                  const role = u.userPermissions.find(
                    u => user._id === u.user
                  ).role;
                  return (
                    u._id === e.category._id &&
                    (role === 'Admin' || role === 'Editor')
                  );
                });

                if ((user.isAdmin || show) && !e.approved) {
                  return (
                    <div key={e._id}>
                      <p className='text-m'>{e.subCategory? e.subCategory.name : e.category.name}</p>
                      <div
                        className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                      >
                        <p className='text-xl font-bold'>{e.title}</p>
                        <Link
                          to={`/content/post/${e._id}`}
                          className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCategoryManage;
