import JoditEditor from 'jodit-react';
import React, { useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useAddCommentMutation,
  useGetPostQuery,
} from '../../app/services/postApi';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPostQuery({
    id: postId,
  });
  const [comment, setComment] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [addComment] = useAddCommentMutation();
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

  if (isLoading) {
    return 'Loading...';
  }

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (comment) {
      setIsSubmiting(true);
      try {
        await addComment({ id: postId, text: comment }).unwrap();
        setComment('');
      } catch (error) {
        console.log(error);
      }
      setIsSubmiting(false);
    }
  };

  console.log(post);

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <Button className='mb-3' onClick={() => navigate(-1)}>
        Back
      </Button>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-5xl font-bold'>{post?.title}</h1>
        <h3 className='text-lg font-normal'>{post?.category?.name}</h3>
        <h4 className='text-lg font-normal'>{post?.subCategory?.name}</h4>
        {post?.liveUrl && (
          <div className='flex justify-center items-center mb-5'>
            <ReactPlayer url={post?.liveUrl} controls={true} muted={true} />
          </div>
        )}
        <JoditEditor value={post?.content} config={config} />

        <div className='p-5'>
          <h2 className='text-lg font-bold mb-4'>Comments</h2>
          {post?.comments?.map(comment => (
            <div
              className='border border-gray-300 p-2 rounded my-2'
              key={comment._id}
            >
              <div className='flex   gap-2  items-center'>
                <img
                  src={comment.postedBy.imageUrl}
                  alt='user-profile'
                  className='w-10 h-10 rounded-full'
                />
                <p className='text-sm font-bold'>{comment.postedBy.name}</p>
              </div>
              <p className='text-sm mt-2'>{comment?.text}</p>
            </div>
          ))}
          {post?.comments?.length === 0 && <p>No Comments Found.</p>}
        </div>
        {user && (
          <div className='mt-5 border-t border-t-gray-300 p-5'>
            <Input
              type='textarea'
              label={false}
              placeholder='Comment'
              fullWidth
              onChange={handleCommentChange}
              value={comment}
            />
            <Button
              type='success'
              onClick={handleCommentSubmit}
              disabled={isSubmiting}
            >
              {isSubmiting ? 'Submiting...' : 'Submit'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
