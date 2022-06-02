import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Modal from '../../../../components/Modal/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPostQuery,
  useApprovePostMutation,
} from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';
import DeletePostModal from './DeletePostModal';
const ContentPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [id, setId] = useState('');
  const { data: post, isLoading } = useGetPostQuery({
    id: postId,
  });
  const [openModal,setOpenModal] = useState(false);
  const [approvePost] = useApprovePostMutation();
  const user = useSelector(state => state.user);
  console.log(user.isAdmin);
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
    try {
      await approvePost({ id, approved: true });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnpublish = async () => {
    try {
      await approvePost({ id, approved: false });
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmDelete = () => {
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }
  useEffect(() => {
    setId(post?._id);
  }, [post]);

  if (isLoading) {
    return 'Loading...';
  }
  console.log(post);
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='my-5'>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-5xl font-bold'>{post?.title}</h1>
        <h3 className='text-lg font-normal'>{post?.category?.name}</h3>
        <h4 className='text-lg font-normal'>{post?.subCategory?.name}</h4>
        {post?.live && <ReactPlayer url={post?.live} controls={true} />}
        <JoditEditor value={post?.content} config={config} />
        {user?.isAdmin?
          <div className='flex mt-10 justify-end'>
          {!post?.approved && (
            <Button type='success' onClick={handlePublish}>
              Publish
            </Button>
          )}
          {post?.approved && (
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
          :
          <div className='flex mt-10 justify-end'>
            {!post?.approved && <Button type='success'
               onClick={() => {
                navigate('edit');
              }}
            >
              Edit Post
            </Button>}
          </div>
        }
      </div>
      {openModal && (
        <Modal handleClose={handleCloseModal}>
          <DeletePostModal
            handleCloseModal={handleCloseModal}
            postId={postId}
            className='p-8'
            post = {post}
          />
        </Modal>
      )}
    </div>
  );
};

export default ContentPost;
