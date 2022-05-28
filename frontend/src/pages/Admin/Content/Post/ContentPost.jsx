import JoditEditor from 'jodit-react';
import React, { useMemo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const ContentPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPostQuery({
    id: postId,
  });

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

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-5xl font-bold'>{post?.title}</h1>
        <h3 className='text-lg font-normal'>{post?.category?.name}</h3>
        <h4 className='text-lg font-normal'>{post?.subCategory?.name}</h4>
        {post?.live && <ReactPlayer url={post?.live} controls={true} />}
        <JoditEditor value={post?.content} config={config} />
      </div>
    </div>
  );
};

export default ContentPost;
