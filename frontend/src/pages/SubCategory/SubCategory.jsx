import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetSubCategoryQuery } from '../../app/services/adminApi';
import { useGetAllPostsBySubCategoryQuery } from '../../app/services/postApi';
import ReactPaginate from 'react-paginate';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import SubscribeModal from '../../components/Subscribe/SubscribeModal';
import { useSelector } from 'react-redux';
import Input from '../../components/Input/Input';

const SubCategory = () => {
  const user = useSelector(state => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOption, setSearchOption] = useState({});
  const [page, setPage] = useState(1);
  const { subCategoryId } = useParams();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { data: subCategory } = useGetSubCategoryQuery({ id: subCategoryId });
  const {
    data: paginated,
    isLoading,
    refetch,
  } = useGetAllPostsBySubCategoryQuery({
    id: subCategoryId,
    page,
    searchOption,
  });
  const posts = paginated?.posts;

  const [openSubscribeModal, setOpenSubscribeModal] = useState(false);
  let selected;
  useEffect(() => {
    const setCurrent = () => {
      setPage(1);
      selected = 1;
    };
    setCurrent();
  }, [subCategoryId]);
  if (isLoading) {
    return 'Loading...';
  }

  const handleOpenSubscribeModal = () => {
    setOpenSubscribeModal(true);
  };

  const handleCloseSubscribeModal = () => {
    setOpenSubscribeModal(false);
  };
  const handlePageChange = e => {
    selected = parseInt(e.selected + 1);
    setPage(selected);
  };
  const handleSearch = () => {
    let option = {};

    if (searchQuery) {
      option = { ...option, searchQuery };
    }

    if (fromDate) {
      option = { ...option, fromDate: fromDate };
    }

    if (toDate) {
      option = { ...option, toDate: toDate };
    }
    setSearchOption(option);
    refetch();
  };
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold'>{`All Posts from ${subCategory?.name}`}</h1>
        <div className='mb-10'>
          <h3>Receive Email/SMS by Subscribing</h3>
          {user ? (
            <Button
              className='text-xs px-2 py-2'
              onClick={handleOpenSubscribeModal}
            >
              Subscribe
            </Button>
          ) : (
            <Link to={`/login`}>
              <Button className='text-xs px-2 py-2'>Subscribe</Button>
            </Link>
          )}
        </div>
        <div className='flex items-end justify-center mb-4'>
          <Input
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
            className='py-0 px-0 mb-0 w-full'
            placeholder='Search'
          />
          <div className='ml-4'>
            <label htmlFor='fromDate'>From Date:</label>
            <input
              type='date'
              name='fromDate'
              id='fromDate'
              onChange={e => setFromDate(e.target.value)}
              className='px-2 py-1  border border-gray-500'
            />
          </div>
          <div className='ml-4'>
            <label htmlFor='toDate'>To Date:</label>
            <input
              type='date'
              name='toDate'
              id='toDate'
              onChange={e => setToDate(e.target.value)}
              className='px-2 py-1  border border-gray-500'
            />
          </div>
          <Button className='ml-4' onClick={handleSearch}>
            Search
          </Button>
        </div>
        {posts &&
          posts?.map(post => {
            if (post.approved) {
              return (
                <Link to={`/post/${post._id}`} key={post._id}>
                  <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                    <h2 className='font-normal'>{post.category.name}</h2>
                    <h2 className='text-xl'>{post?.subCategory?.name}</h2>
                  </div>
                </Link>
              );
            }
          })}
      </div>
      <div className='mt-5' key={subCategoryId}>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={parseInt(paginated?.numberOfPages)}
          pageLinkClassName={'px-5 mx-2 hover:text-red-400'}
          previousLinkClassName={'uppercase text-xs mx-4 hover:text-red-400 '}
          nextLinkClassName={'uppercase text-xs mx-4 hover:text-red-400 '}
          activeClassName={'font-bold text-xl'}
          className={'flex justify-center items-center text-red-600 '}
          onPageChange={handlePageChange}
        />
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
