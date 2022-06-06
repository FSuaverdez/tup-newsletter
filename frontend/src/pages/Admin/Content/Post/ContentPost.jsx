import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Modal from '../../../../components/Modal/Modal';
import PostLoadingModal from '../../../../components/PostLoading/PostLoadingModal';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostQuery,
  useApprovePostMutation,
} from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';
import DeletePostModal from './DeletePostModal';
import { MetroSpinner } from "react-spinners-kit";
const ContentPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [id, setId] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  const [isLoadingPublish,setIsLoadingPublish] = useState(false);
  const { data: post } = useGetPostQuery({
    id: postId,
  });
  const [approved, setApproved] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [approvePost] = useApprovePostMutation();
  const user = useSelector(state => state.user);
  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
      },
      showCharsCounter: false,
      showXPathInStatusbar: false,
      showWordsCounter: false,
      toolbar: false,
      readonly: true, // all options from https://xdsoft.net/jodit/doc/,
    }),
    []
  );
  const handlePublish = async () => {
    setIsLoadingPublish(true)
    try {
      await approvePost({ id, approved: true });
      setIsLoadingPublish(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnpublish = async () => {
    setIsLoadingPublish(true);
    try {
      await approvePost({ id, approved: false });
      setIsLoadingPublish(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmDelete = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    setId(post?._id);
    post&&setIsLoading(false);
    post&&setApproved(post.approved);
  }, [post]);
  
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='my-5'>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      {isLoading ? 
        <div className='my-20'>
          <div className='flex justify-center mt-1 mb-1'>
                <MetroSpinner  size={40} color="#FF2400" />
            </div>

            <div className='flex justify-center ml-5 mt-2.5'>
                <p className='text-xl font-bold'>Loading, Kindly wait for a moment.</p>
            </div>   
        </div>    
        :
        <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
          <h1 className='text-5xl font-bold'>{post?.title}</h1>
          <h3 className='text-lg font-normal'>{post?.category?.name}</h3>
          <h4 className='text-lg font-normal'>{post?.subCategory?.name}</h4>
          {post?.live && <ReactPlayer url={post?.live} controls={true} />}
          <JoditEditor value={post?.content} config={config} />
          {user?.isAdmin ? (
            <div className='flex mt-10 justify-end'>
              {!approved && (
                <Button type='success' onClick={handlePublish}>
                  Publish
                </Button>
              )}
              {approved && (
                <Button type='danger' onClick={handleUnpublish}>
                  Unpublish
                </Button>
              )}
              <div className='mx-5'>
                <Button type='danger' onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className='flex mt-10 justify-end'>
              {!post?.approved && (
                <Button
                  type='success'
                  onClick={() => {
                    navigate('edit');
                  }}
                >
                  Edit Post
                </Button>
              )}
            </div>
          )}
        </div>
      }
      {openModal && (
        <Modal handleClose={handleCloseModal}>
          <DeletePostModal
            handleCloseModal={handleCloseModal}
            postId={postId}
            className='p-8'
            post={post}
          />
        </Modal>
      )}
      {isLoadingPublish && (
           <Modal>
           <PostLoadingModal
             className='p-8'
           />
         </Modal>
        )}
    </div>
  );
};

export default ContentPost;
