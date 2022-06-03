import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetSubCategoryQuery } from '../../app/services/adminApi';
import { useGetAllPostsBySubCategoryQuery } from '../../app/services/postApi';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import SubscribeModal from '../../components/Subscribe/SubscribeModal';
import { useSelector } from 'react-redux';

const SubCategory = () => {
  const user = useSelector(state => state.user);
  const { subCategoryId } = useParams();
  const { data: subCategory } = useGetSubCategoryQuery({ id: subCategoryId });
  const { data: posts, isLoading } = useGetAllPostsBySubCategoryQuery({
    id: subCategoryId,
  });

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);
  if (isLoading) {
    return 'Loading...';
  }

  const handleOpenSubscribeModal = () => {
    setOpenSubscribeModal(true);
  };

  const handleCloseSubscribeModal = () => {
    setOpenSubscribeModal(false);
  };
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold'>{`All Posts from ${subCategory?.name}`}</h1>
        <div className='mb-10'>
          <h3>Receive Email/SMS by Subscribing</h3>
          {user ? 
            <Button
              className='text-xs px-2 py-2'
              onClick={handleOpenSubscribeModal}
            >
              Subscribe
            </Button> :
            <Link
              to={`/login`}
            >
              <Button
              className='text-xs px-2 py-2'
              >
                Subscribe
              </Button>
            </Link>
          }
        </div>
        {posts&&posts?.map(post => {
          if (post.approved){
            return (
              <Link to={`/post/${post._id}`} key={post._id}>
                <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                  <h2 className='text-xl font-bold'>{post.title}</h2>
                  <h2 className='font-normal'>{post.category.name}</h2>
                  <h2 className='text-xl'>{post?.subCategory?.name}</h2>
                </div>
              </Link>
            )
          }
        })}
      </div>
      {openSubscribeModal && (
        <Modal handleClose={handleCloseSubscribeModal}>
          <SubscribeModal
            handleClose={handleCloseSubscribeModal}
            data={subCategory}
            dataType='SubCategory'
          />
        </Modal>
      )}
    </div>
  );
};

export default SubCategory;
