import JoditEditor from 'jodit-react';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetPostQuery,
  useGetRecommendedPostsQuery,
} from '../../app/services/postApi';
import moment from 'moment';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import 'moment-timezone';
const Post = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { data: post } = useGetPostQuery({
    id: postId,
  });
  const { data: recommendedPosts } = useGetRecommendedPostsQuery({
    id: postId,
  });
  const [comment, setComment] = useState('');
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
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

  const handleDeleteComment = async commentId => {
    try {
      await deleteComment({ postId: postId, commentId });
    } catch (error) {}
  };

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
  useEffect(() => {
    const setCurrent = () => {
      post && setIsLoading(false);
    };
    setCurrent();
  }, [post]);

  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <Button className='mb-3' onClick={() => navigate(-1)}>
        Back
      </Button>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
          <h1 className='text-xl md:text-5xl font-bold'>{post?.title}</h1>
          <h3 className='text-base md:text-lg font-normal'>
            {post?.category?.name}
          </h3>
          <h2 className='font-normal'>
            {Math.abs(
              new Date(
                moment.tz(post.approvedAt.slice(0, 19), 'Asia/Manila')
              ).getTime() - new Date().getTime()
            ) /
              (60 * 60 * 1000) <
            24
              ? moment(
                  moment.tz(post.approvedAt.slice(0, 19), 'Asia/Manila')
                ).fromNow()
              : moment(
                  moment.tz(post.approvedAt.slice(0, 19), 'Asia/Manila')
                ).calendar()}
          </h2>
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
                <div className='flex  justify-between gap-2  items-center'>
                  <div className='flex gap-2 items-center'>
                    <img
                      src={comment.postedBy.imageUrl}
                      alt='user-profile'
                      className='w-10 h-10 rounded-full'
                    />
                    <p className='text-sm font-bold'>{comment.postedBy.name}</p>
                  </div>
                  {user?._id === comment?.postedBy?._id || user?.isAdmin ? (
                    <div>
                      <Button
                        className='text-xs'
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ) : null}
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
          <div>
            {recommendedPosts?.categoryPosts?.filter(p => p._id !== post._id)
              .length > 0 ? (
              <div>
                <h2 className='text-lg font-bold mb-4'>
                  Recommended Posts from{' '}
                  {recommendedPosts.categoryPosts[0].category.name}
                </h2>
                {recommendedPosts.categoryPosts
                  ?.filter(p => p._id !== post._id)
                  .map(p => (
                    <Link to={`/post/${[p._id]}`} key={p._id}>
                      <div className='border border-gray-300 p-2 rounded my-2'>
                        <div className='flex  justify-between gap-2  items-center'>
                          <div className='flex-col gap-2 items-center'>
                            <p className='text-sm font-bold'>{p.title}</p>
                            <p className='text-sm font-normal'>
                              {Math.abs(
                                new Date(
                                  moment.tz(
                                    p.approvedAt?.slice(0, 19),
                                    'Asia/Manila'
                                  )
                                ).getTime() - new Date().getTime()
                              ) /
                                (60 * 60 * 1000) <
                              24
                                ? moment(
                                    moment.tz(
                                      p.approvedAt?.slice(0, 19),
                                      'Asia/Manila'
                                    )
                                  ).fromNow()
                                : moment(
                                    moment.tz(
                                      p.approvedAt?.slice(0, 19),
                                      'Asia/Manila'
                                    )
                                  ).calendar()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : null}
            {recommendedPosts?.subCategoryPosts &&
            post.subCategory &&
            recommendedPosts?.subCategoryPosts?.filter(p => p._id !== post._id)
              .length > 0 ? (
              <div>
                <h2 className='text-lg font-bold mb-4 mt-3'>
                  Recommended Posts from{' '}
                  {recommendedPosts?.subCategoryPosts[0]?.subCategory?.name}
                </h2>
                {recommendedPosts?.subCategoryPosts
                  ?.filter(p => p._id !== post._id)
                  .map(p => (
                    <Link to={`/post/${[p._id]}`} key={p._id}>
                      <div className='border border-gray-300 p-2 rounded my-2'>
                        <div className='flex  justify-between gap-2  items-center'>
                          <div className='flex-col gap-2 items-center'>
                            <p className='text-sm font-bold'>{p.title}</p>
                            <p className='text-sm font-normal'>
                              {Math.abs(
                                new Date(
                                  moment.tz(
                                    p.approvedAt?.slice(0, 19),
                                    'Asia/Manila'
                                  )
                                ).getTime() - new Date().getTime()
                              ) /
                                (60 * 60 * 1000) <
                              24
                                ? moment(
                                    moment.tz(
                                      p.approvedAt?.slice(0, 19),
                                      'Asia/Manila'
                                    )
                                  ).fromNow()
                                : moment(
                                    moment.tz(
                                      p.approvedAt?.slice(0, 19),
                                      'Asia/Manila'
                                    )
                                  ).calendar()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
