import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import Modal from '../../../../components/Modal/Modal';
import Loading from '../../../../components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetArchivedQuery,
} from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';
import DeletePostModal from './DeletePostModal';

const ArchivePost = () => {
  const navigate = useNavigate();
  const { archivedId } = useParams();
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { data: post } = useGetArchivedQuery({
    id: archivedId,
  });
  const [approved, setApproved] = useState();
  const [openModal, setOpenModal] = useState(false);
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

  const handleConfirmDelete = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    setId(post?._id);
    post && setIsLoading(false);
    post && setApproved(post.approved);
  }, [post]);

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='my-5'>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
      {(isLoading) ? (
        <Loading />
      ) : (
        <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
          <h1 className='text-5xl font-bold'>{post?.title}</h1>
          <h3 className='text-lg font-normal'>{post?.category}</h3>
          <h4 className='text-lg font-normal'>{post?.subCategory}</h4>
          <h4 className='text-lg font-normal'>Publish Date: {post?.approvedAt.slice(0,10)}</h4>
          <h4 className='text-lg font-normal'>Archived Date: {post?.createdAt.slice(0,10)}</h4>
          {post?.liveUrl && (
            <div className='flex justify-center items-center mb-5'>
              <ReactPlayer url={post?.liveUrl} controls={true} muted={true} />
            </div>
          )}
          <JoditEditor value={post?.content} config={config} />
          {user?.isAdmin && (
            <div className='flex mt-10 justify-end'>
              <div className='mr-5'>
                <Button type='danger' onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </div> 
            </div>
          ) }
        </div>
      )}
      {openModal && (
        <Modal handleClose={handleCloseModal}>
          <DeletePostModal
            handleCloseModal={handleCloseModal}
            postId={archivedId}
            className='p-8'
            post={post}
          />
        </Modal>
      )}
    </div>
  );
};

export default ArchivePost;
