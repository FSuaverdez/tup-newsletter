import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '../../../../app/services/adminApi';
import { useGetAllPostsQuery, useArchiveAllCategoryPostMutation } from '../../../../app/services/postApi';
import ArchiveAllApprovePostModal from './ArchiveAllApprovePostModal';
import { MetroSpinner } from "react-spinners-kit";
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';

const PostAllCategory = (type) => {
  const user = useSelector(state => state.user);
  const { categoryId } = useParams();
  const { data: category } = useGetCategoryQuery({ id: categoryId });
  const { data: posts } = useGetAllPostsQuery();
  const [isOpen,setIsOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [archiveAllApprovedPost] = useArchiveAllCategoryPostMutation();

  const navigate = useNavigate();

  const filteredPost = posts?.filter(post => post.category._id === categoryId);
  let checkApprove = false;
  filteredPost&&filteredPost.map ((e) => {
    if (e.approved){
      checkApprove = true;
    }
  })
  const handleOpenModal = () => {
    setIsOpen(true);
  }
  const handleCloseModal = () => {
    setIsOpen(false);
  }
  const handleArchiveAllPost = async () => {
    setIsLoading(true);
    setIsOpen(false)
    const resp = await archiveAllApprovedPost({id:categoryId})
    resp && setIsLoading(false)
    !isLoading && navigate('/archived');
  }
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
          {(type?.type === 'A'&& checkApprove && user.isAdmin) && 
            <div className='flex justify-end mb-5'>
                {isLoading ?
                  <Button type='danger'>
                  <div className = 'flex'><p className = 'mr-3'>Archiving</p> <MetroSpinner size={20} color="white" /></div>
                 </Button>
                :
                  <Button type='danger' onClick={handleOpenModal}>
                    Archive All Approved Post
                  </Button>
                }
            </div>
          }
          {type.type==='A' && 
            <div>
              {filteredPost && 
                filteredPost.map(c => {
                  if (c?.approved){
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
                          <p className='text-m'>{!c.subCategory ? c.category.name:c.subCategory.name }</p>
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
      {isOpen &&
      <Modal handleClose={handleCloseModal}>
          <ArchiveAllApprovePostModal
            handleCloseModal={handleCloseModal}
            name = {category.name}
            handleArchiveAllPost = {handleArchiveAllPost}
            className='p-8'
          />
      </Modal>
      }
    </div>
  );
};

export default PostAllCategory;
