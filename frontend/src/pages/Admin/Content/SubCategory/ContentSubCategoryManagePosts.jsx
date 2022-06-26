import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetAllPostsQuery,useArchiveAllSubCategoryPostMutation } from '../../../../app/services/postApi';
import { useState } from 'react';
import { useGetSubCategoryQuery } from '../../../../app/services/adminApi';
import Button from '../../../../components/Button/Button';
import Loading from '../../../../components/Loading/Loading';
import Modal from '../../../../components/Modal/Modal';
import ArchiveAllApprovePostModal from '../Post/ArchiveAllApprovePostModal';
import { MetroSpinner } from "react-spinners-kit";

const ContentSubCategoryManagePosts = () => {
  const user = useSelector(state => state.user);
  const { subCategoryId } = useParams();
  const { data: subCategory, isLoading } = useGetSubCategoryQuery({
    id: subCategoryId,
  });

  const { data: posts, isLoading: isPostsLoading } = useGetAllPostsQuery();
  const checker = subCategoryId;
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const [archiving,setArchiving] = useState(false);
  const [archiveAllApprovedPost] = useArchiveAllSubCategoryPostMutation();
  let checkApprove = false;

  if (isLoading && isPostsLoading) {
    return <Loading/>;
  }
  const filteredPost = posts?.filter(
    post => post?.subCategory?._id === subCategoryId
  );
  const handleOpenModal = () => {
    setIsOpen(true);
  }
  const handleCloseModal = () => {
    setIsOpen(false);
  }
  const handleArchiveAllPost = async () => {
    setArchiving(true);
    setIsOpen(false)
    const resp = await archiveAllApprovedPost({id:subCategoryId})
    resp && setArchiving(false)
    !isLoading && navigate('/archived');
  }
  filteredPost && filteredPost.map((e) => {
    if (e.approved){
      checkApprove = true;
    }
  })
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <h1 className='text-3xl font-bold my-5'>
        Manage {subCategory?.name} Posts
      </h1>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h2 className=' text-black text-xl font-semibold'>
          {subCategory?.name}
        </h2>
        <p className='text-black '>{subCategory?.description}</p>
        <div className='border-t-2 border-black mt-10'>
          <h2 className='text-2xl font-bold mt-2'>Manage Posts</h2>
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
          <div>
          <p className='text-lg font-bold my-5 text-green-500'>Approved Posts</p>
          {(checkApprove && user.isAdmin) &&<div className='flex justify-end mb-5'>
              {archiving ?
                  <Button type='danger'>
                  <div className = 'flex'><p className = 'mr-3'>Archiving</p> <MetroSpinner size={20} color="white" /></div>
                 </Button>
                :
                  <Button type='danger' onClick={handleOpenModal}>
                    Archive All Approved Post
                  </Button>
                }
          </div>}
            {filteredPost && filteredPost.map(c => {
              if(c.approved){
                return (
                <div key={c._id}>
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
              }})}
          </div>
         <div>
         <p className='text-lg font-bold my-5 text-rose-600'>Pending Posts</p>
            {filteredPost && filteredPost.map(c => {
              if (!c.approved){
                return(
            
                <div key={c._id}>
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
        </div>
      </div>
      {isOpen &&
      <Modal handleClose={handleCloseModal}>
          <ArchiveAllApprovePostModal
            handleCloseModal={handleCloseModal}
            name = {subCategory.name}
            handleArchiveAllPost = {handleArchiveAllPost}
            className='p-8'
          />
      </Modal>
      }
    </div>
  );
};

export default ContentSubCategoryManagePosts;
