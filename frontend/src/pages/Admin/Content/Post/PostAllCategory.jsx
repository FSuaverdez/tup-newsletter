import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../../../app/services/adminApi';
import { useGetAllPostsQuery } from '../../../../app/services/postApi';

import Button from '../../../../components/Button/Button';
const PostAllCategory = (type) => {
  const { categoryId } = useParams();
  const { data: category, isLoading } = useGetCategoryQuery({ id: categoryId });
  const { data: posts, isLoading: isPostsLoading } = useGetAllPostsQuery();

  const navigate = useNavigate();

  if (isLoading && isPostsLoading) {
    return 'Loading...';
  }

  const filteredPost = posts?.filter(post => post.category._id === categoryId);
  console.log(filteredPost)
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-2xl font-bold my-5'>Manage {category?.name}</h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>{category?.name}</h2>
        <p className='text-black '>{category?.description}</p>
        <div className='border-t-2 border-black mt-10'></div>
        <div>
          <h1 className='text-xl font-bold mt-5'>
           { type.type==='A'? `Manage All ${category?.name} Approved Posts` : `Manage All ${category?.name} Pending Posts` }
          </h1>
          {type.type==='A' && 
            <div>
              {filteredPost && 
                filteredPost.map(c => {
                  if (c?.approved){
                    return (
                      <div key={c._id}>
                        <p className='text-m'>{c.subCategory.name ? c.subCategory.name : c.category.name}</p>
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
                    )
                }
                })}
              </div>
            }
          {type.type==='P' &&
            <div>
              {filteredPost &&
                filteredPost.map(c => {
                  if (!c.approved) {
                    return(
                        <div  key={c._id}>
                          <p className='text-m'>{c.subCategory.name ? c.subCategory.name :c.category.name}</p>
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
                      )
                  }
                })}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default PostAllCategory;
