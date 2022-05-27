import React, { useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Button from '../../../../components/Button/Button';
import ReactPlayer from 'react-player';

const CreatePostConfirmationModal = ({
  handleClose,
  handleSave,
  className: classes,
  post,
}) => {
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
  return (
    <div
      className={`xl:w-880 lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes} overflow-auto h-800`}
      onClick={e => e.stopPropagation()}
    >
      <h2 className='text-xl font-bold mb-10 border-b border-b-gray-300 pb-4'>
        Post Preview (Approval Required)
      </h2>
      <h1 className='text-5xl font-bold'>{post.title}</h1>
      <h3 className='text-lg font-normal'>{post.category.label}</h3>
      <h4 className='text-lg font-normal'>{post.subCategory.label}</h4>
      {post.live && <ReactPlayer url={post.live} controls={true} />}
      <JoditEditor value={post.content} config={config} />
      <div className='flex gap-2 justify-end mt-5'>
        <Button type='danger' onClick={handleClose}>
          Close
        </Button>
        <Button type='success' onClick={handleSave}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default CreatePostConfirmationModal;
