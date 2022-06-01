import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery,useApprovePostMutation } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const ContentPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [id,setId] = useState('');
  const [approved,setApproved] = useState(true);
  const { data: post, isLoading } = useGetPostQuery({
    id: postId,
  });
  const [approvePost] = useApprovePostMutation(); 

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
    try{
      setApproved(true);
      await approvePost({id,approved})
    }
    catch(error){
      console.log(error)
    }
    
  }
  const handleUnpublish = async () => {
    
    try{
      setApproved(false);
      await approvePost({id,approved})
    }
    catch(error){
      console.log(error)
    }
    
  }
  useEffect(()=>{
    setId(post?._id)
  },[post])

  if (isLoading) {
    return 'Loading...';
  }
  console.log(post)
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='my-5'><Button onClick={() => navigate(-1)}>Back</Button></div>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-5xl font-bold'>{post?.title}</h1>
        <h3 className='text-lg font-normal'>{post?.category?.name}</h3>
        <h4 className='text-lg font-normal'>{post?.subCategory?.name}</h4>
        {post?.live && <ReactPlayer url={post?.live} controls={true} />}
        <JoditEditor value={post?.content} config={config} />
        <div className='flex mt-10 justify-end'>
          {!post?.approved &&
          <Button type='success' onClick={handlePublish}>
                Publish
          </Button> 
          }
          {post?.approved && 
          <Button type='danger' onClick={handleUnpublish}>
              Unpublish
          </Button>}
        </div>
      </div>
    </div>
  );
};

export default ContentPost;
