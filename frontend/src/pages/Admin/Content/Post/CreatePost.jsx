import React, { useEffect, useMemo, useRef, useState } from 'react';

import SelectCategory from '../../../../components/SelectCategory/SelectCategory';
import SelectPostType from '../../../../components/SelectPostType/SelectPostType';
import SelectSubCategory from '../../../../components/SelectSubCategory/SelectSubCategory';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import PostLoadingModal from '../../../../components/PostLoading/PostLoadingModal';
import PostCompleteModal from '../../../../components/PostLoading/PostCompleteModal';
import CreatePostConfirmationModal from './CreatePostConfirmationModal';
import JoditEditor from 'jodit-react';
import { useAddPostMutation } from '../../../../app/services/postApi';
import { useGetCategoryQuery,useGetSubCategoryQuery } from '../../../../app/services/adminApi';
import { useNavigate,useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const CreatePost = () => {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);
  const [subCategory, setSubCategory] = useState('');
  const [live, setLive] = useState(null);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState(false);
  const [preview, setPreview] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [postType, setPostType] = useState({ value: 'post', label: 'Post' });
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();
  const [openSave, setOpenSave] = useState(false);
  const [addPost] = useAddPostMutation();
  const {id} = useParams();
  const { data: passedCategory } = useGetCategoryQuery({
    id: id || '0',
  });
  const { data: passedSubCategory} = useGetSubCategoryQuery({
    id: id || '0',
  });
  useEffect(()=>{
    const setPassed = () => {
      if (passedCategory){
        setCategory({value:passedCategory._id, label:passedCategory.name})
      }
      if (passedSubCategory){
        setCategory({value:passedSubCategory.category._id, label:passedSubCategory.category.name})
        setSubCategory({value:passedSubCategory._id, label:passedSubCategory.name})
      }
    }
    setPassed();
  },[passedCategory,passedSubCategory])
 
  const config = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
      },
      showCharsCounter: false,
      showXPathInStatusbar: false,
      showWordsCounter: false,
      toolbar: preview ? false : true,
      readonly: preview, // all options from https://xdsoft.net/jodit/doc/,
    }),
    [preview]
  );
  const handleCategoryChange = e => {
    setCategory(e);
    setSubCategory('');
  };
  const handleSubCategoryChange = e => {
    setSubCategory(e);
  };

  const handlePostTypeChange = e => {
    setPostType(e);
    setLive(null);
  };

  const handleCloseConfirmation = () => {
    setOpenSave(false);
  };
  const handleCloseCompleted = () =>{
    setIsCompleted(false);
    navigate('/content/category');
  };

  const handleSave = async () => {
    setOpenSave(false);
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!content) {
      setContentError(true);
    } else {
      setContentError(false);
    }
    if (!category.value) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    try {
      if (title && content && category.value) {
        setOpenSave(false);
        setTitleError(false);
        setContentError(false);
        setCategoryError(false);
        setIsLoading(true);
        const data = await addPost({
          title,
          type: postType.value,
          liveUrl: live || null,
          content,
          category: category.value,
          subCategory: subCategory.value || null,
        }).unwrap();
        data&&setIsLoading(false);
        setIsCompleted(true);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
     <div className='mb-5'><Button onClick={() => navigate(-1)}>Back</Button></div>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h1 className='text-2xl font-bold my-5'>Create Post</h1>
        <SelectPostType
          value={postType}
          onChange={handlePostTypeChange}
          className='mt-4'
        />
        <Input
          fullWidth
          type='text'
          name='title'
          label='Title'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
        />
        {titleError && (
          <p className='text-red-500 text-sm mb-5'>Title is required.</p>
        )}
        <SelectCategory value={category} onChange={handleCategoryChange} />
        {categoryError && (
          <p className='text-red-500 text-sm mb-5'>Category is required.</p>
        )}
        <SelectSubCategory
          categoryId={category._id}
          value={subCategory}
          onChange={handleSubCategoryChange}
        />
        {postType.value === 'live' && (
          <>
            <Input
              fullWidth
              type='text'
              name='liveUrl'
              label='Live URL'
              onChange={e => {
                if (ReactPlayer.canPlay(e.target.value)) {
                  setCanPlay(true);
                } else {
                  setCanPlay(false);
                }
                setLive(e.target.value);
              }}
              value={live}
              required
            />
            {live !== '' && !canPlay ? (
              <p className='text-red-500 text-sm mb-5'>
                URL is not a valid live video URL.
              </p>
            ) : null}
          </>
        )}
        <div className='mt-5 bg-white'>
          <h2 className='text-lg font-bold text-black'>Content:</h2>
          {contentError && (
            <p className='text-red-500 text-sm mb-5'>Content is required.</p>
          )}
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => {}} // preferred to use only this option to update the content for performance reasons
            onChange={newContent => {
              setContent(newContent);
            }}
          />
        </div>
        <div className='flex justify-end items-center text-xl mt-10'>
          <Button
            className='font-bold'
            type='success'
            onClick={() => setOpenSave(true)}
          >
            Submit
          </Button>
        </div>
        {openSave && (
          <Modal handleClose={handleCloseConfirmation}>
            <CreatePostConfirmationModal
              handleClose={handleCloseConfirmation}
              handleSave={handleSave}
              className='p-8'
              post={{ postType, title, live, content, category, subCategory }}
            />
          </Modal>
        )}
        {isLoading && (
           <Modal handleClose={handleCloseConfirmation}>
           <PostLoadingModal
             className='p-8'
           />
         </Modal>
        )}
        {isCompleted && (
           <Modal handleClose={handleCloseCompleted}>
           <PostCompleteModal
             className='p-8'
             handleCloseCompleted = {handleCloseCompleted}
           />
         </Modal>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
