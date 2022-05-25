import React, { useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
// import htmlToDraft from 'html-to-draftjs';

import SelectCategory from '../../../../components/SelectCategory/SelectCategory';
import SelectPostType from '../../../../components/SelectPostType/SelectPostType';
import SelectSubCategory from '../../../../components/SelectSubCategory/SelectSubCategory';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import JoditEditor from 'jodit-react';

const CreatePost = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [live, setLive] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [postType, setPostType] = useState({ value: 'post', label: 'Post' });
  const editor = useRef(null);

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
  };

  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h1 className='text-2xl font-bold my-5'>Create Post</h1>
        <Button type='success' onClick={() => setPreview(prev => !prev)}>
          {preview ? 'Show Editor' : 'Show Preview'}
        </Button>
        <SelectPostType
          value={postType}
          onChange={handlePostTypeChange}
          className='mt-4'
        />

        {!preview ? (
          <>
            <Input
              fullWidth
              type='text'
              name='title'
              label='Title'
              onChange={e => setTitle(e.target.value)}
              value={title}
              required
            />
            <SelectCategory value={category} onChange={handleCategoryChange} />
            <SelectSubCategory
              categoryId={category._id}
              value={subCategory}
              onChange={handleSubCategoryChange}
            />
          </>
        ) : (
          <>
            <h1 className='text-3xl font-bold my-5'>{title}</h1>
            <h2 className='text-base '>{category.label}</h2>
            <h3 className='text-sm'>{subCategory.label}</h3>
          </>
        )}

        {postType.value === 'post' && (
          <>
            <div className='mt-5 bg-white'>
              <h2 className='text-lg font-bold text-black'>Content:</h2>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {
                  console.log(newContent);
                  setContent(newContent);
                }}
              />
            </div>
            <div>
              <textarea disabled value={content} />
            </div>
          </>
        )}

        {postType.value === 'live' && (
          <>
            {!preview ? (
              <Input
                fullWidth
                type='text'
                name='liveUrl'
                label='Live URL'
                onChange={e => setLive(e.target.value)}
                value={live}
                required
              />
            ) : (
              <ReactPlayer url={live} controls={true} />
            )}

            <div className='mt-5 bg-white'>
              <h2 className='text-lg font-bold text-black'>
                Live Description:
              </h2>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {
                  console.log(newContent);
                  setContent(newContent);
                }}
              />
            </div>

            <div>
              <textarea disabled value={content} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePost;
