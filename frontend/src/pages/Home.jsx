import { Link } from 'react-router-dom';
import { useGetAllHomePostsQuery } from '../app/services/postApi';
import ReactPaginate from 'react-paginate';
import { useEffect, useState, useMemo } from 'react';
import Input from '../components/Input/Input';
import SelectCategory from '../components/SelectCategory/SelectCategory';
import SelectSubCategory from '../components/SelectSubCategory/SelectSubCategory';
import Button from '../components/Button/Button';
import { MetroSpinner } from "react-spinners-kit";
import JoditEditor from 'jodit-react';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [subCategory, setSubCategory] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [searchOption, setSearchOption] = useState({});
  const { data: paginated, refetch } = useGetAllHomePostsQuery({
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
    setIsLoading(true)
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
    console.log(option);
    setSearchOption(option);
    refetch();
    setIsLoading(true)
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
  useEffect(() => {
    const setCurrent = () => {
      paginated && posts && setIsLoading(false);
    };
    setCurrent();
  }, [paginated,posts]);
  return (
    <div className='p-5 max-w-5xl mx-auto article-container'>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto mb-5'>
        <h1 className='text-2xl font-bold mb-10'>All Posts</h1>
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
        <div className='flex items-center gap-5'>
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
        </div>
        {isLoading?
          <div className='my-20'>
            <div className='flex justify-center mt-1 mb-1'>
                  <MetroSpinner  size={40} color="#FF2400" />
              </div>

              <div className='flex justify-center ml-5 mt-2.5'>
                  <p className='text-xl font-bold'>Loading, Kindly wait for a moment.</p>
              </div>   
            </div>    
          :
            posts?.map(post => {
              if (post.approved) {
                return (
                  <Link to={`/post/${post._id}`} key={post._id}>
                    <div className='shadow-lg my-5 border border-gray-200 rounded p-3'>
                      <h2 className='text-xl font-bold'>{post.title}</h2>
                      <h2 className='font-normal'>{post.category.name}</h2>
                      <h2 className='font-normal'>{post.approvedAt}</h2>
                      <h2 className='text-xl'>{post?.subCategory?.name}</h2>
                      <JoditEditor 
                        value={post?.content} 
                        config={config} 
                      />
                    </div>
                  </Link>
                );
              }
            })
          }
      </div>
      <div className='mt-5'>
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
      
    </div>
  );
};

export default Home;
