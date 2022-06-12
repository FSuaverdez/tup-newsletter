import { Link } from 'react-router-dom';
import { useGetAllHomePostsQuery } from '../app/services/postApi';
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useMemo } from 'react';
import Input from '../components/Input/Input';
import SelectCategory from '../components/SelectCategory/SelectCategory';
import SelectSubCategory from '../components/SelectSubCategory/SelectSubCategory';
import Button from '../components/Button/Button';
import Loading from '../components/Loading/Loading';
import JoditEditor from 'jodit-react';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [subCategory, setSubCategory] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [searchOption, setSearchOption] = useState({});
  const {
    data: paginated,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllHomePostsQuery({
    page,
    searchOption,
  });
  const posts = paginated?.homePosts;

  const handleCategoryChange = e => {
    setCategory(e);
    setSubCategory('');
  };
  const handleSubCategoryChange = e => {
    setSubCategory(e);
  };

  const handlePageChange = e => {
    let selected = parseInt(e.selected + 1);
    setPage(selected);
  };

  const handleSearch = () => {
    let option = {};

    if (searchQuery) {
      option = { ...option, searchQuery };
    }

    if (category) {
      option = { ...option, category: category.value };
    }

    if (subCategory) {
      option = { ...option, subCategory: subCategory.value };
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
  const postCut = string => {
    const texts = string.replace(
      /<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g,
      ''
    );
    let replaced = texts.replace(/(<([^>]+)>)/gi, '');
    replaced = replaced.slice(0, 600);
    let arr = [];
    if(string.match(/<img s([\w\W]+?)>/g)){
      arr += string.match(/<img s([\w\W]+?)>/g);
    }
    else{
      arr+='';
    }
    
    return (
      '<span style = "font-size:16px;">' +
      replaced +
      '<span>' +
      '<b style="font-size:16px;"> ' +
      ' ...click to view full article' +
      '</b>' +
      '<div style="margin-top:20px;">' +
       arr +
      '</div>'
    );
  };
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold mb-10'>All Posts</h1>
        <div className='flex flex-col md:flex-row items-start md:items-end justify-center mb-4'>
          <Input
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
            className='py-0 px-0 mb-0 w-full'
            placeholder='Search'
          />
          <div className='md:ml-4 mb-4 md:mb-0 mt-4 md:mt-0 '>
            <label htmlFor='fromDate'>From Date:</label>
            <input
              type='date'
              name='fromDate'
              id='fromDate'
              onChange={e => setFromDate(e.target.value)}
              className='px-2 py-1  border border-gray-500'
            />
          </div>
          <div className='md:ml-4 mb-4 md:mb-0'>
            <label htmlFor='toDate'>To Date:</label>
            <input
              type='date'
              name='toDate'
              id='toDate'
              onChange={e => setToDate(e.target.value)}
              className='px-2 py-1  border border-gray-500'
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-5'>
          <div className='flex justify-center items-center w-full'>
            <p>Category:</p>
            <SelectCategory
              className='w-full mb-0 ml-4'
              hideLabel
              value={category}
              onChange={handleCategoryChange}
            />
          </div>
          <div className='flex justify-center items-center w-full'>
            <p>Subcategory:</p>
            <SelectSubCategory
              className='w-full mb-0 my-0 ml-4'
              hideLabel
              value={subCategory}
              categoryId={category.value}
              onChange={handleSubCategoryChange}
            />
          </div>
          <Button className='ml-0 md:ml-4' onClick={handleSearch}>
            Search
          </Button>
        </div>
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          posts?.map(post => {
            if (post.approved) {
              return (
                <Link to={`/post/${post._id}`} key={post._id}>
                  <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                    <h2 className='text-xl font-bold'>{post.title}</h2>
                    <h2 className='font-normal'>{post.category.name}</h2>
                    <h2 className='font-normal'>
                      {post.approvedAt.slice(0, 10)}
                    </h2>
                    <h2 className='text-xl'>{post?.subCategory?.name}</h2>
                    <JoditEditor
                      value={postCut(post?.content)}
                      config={config}
                    />
                  </div>
                </Link>
              );
            }
          })
        )}
      </div>
      <div className='mt-5 flex justify-center items-center'>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          pageCount={parseInt(paginated?.numberOfPages)}
          pageLinkClassName={'px-2 md:px-5 mx-2 hover:text-red-400'}
          previousLinkClassName={
            'uppercase text-xs mx-2 md:px-4 hover:text-red-400 '
          }
          nextLinkClassName={
            'uppercase text-xs mx-2 md:px-4 hover:text-red-400 '
          }
          activeClassName={'font-bold text-xl'}
          className={'flex justify-center items-center text-red-600 '}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
