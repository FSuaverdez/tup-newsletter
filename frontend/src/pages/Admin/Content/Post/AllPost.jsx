import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllPostsQuery } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';
import Loading from '../../../../components/Loading/Loading';

const AllPost = (type) => {

  const { data: posts } = useGetAllPostsQuery();
  const [isLoading,setIsLoading] = useState(true);
  const navigate = useNavigate();

  const filteredPost = posts;
  useEffect(()=>{
    const loading = () => {
      posts&&setIsLoading(false);
    }
    loading();
  },[posts])
  
  return (
    <div className='p-5 max-w-5xl mx-auto'>
      <Button onClick={() => navigate(-1)} className='mb-5'>Back</Button>
      <div className='bg-white p-5 rounded-lg shadow-lg mx-auto'>
        <h1 className='text-2xl font-bold my-5'>{type?.type === 'A' ? 
            'Manage All Approved Posts' : 
            'Manage All Pending Posts' }
        </h1>
        <div className='border-t-2 border-black mt-5 mb-10'></div>
        {isLoading ? 
          <Loading/> 
          : 
          <div>
            {type?.type === 'A'&&<div>
              {filteredPost && 
                filteredPost.map(c => {
                  if (c?.approved){
                    return (
                      <div key={c._id}>
                        <p className='text-m'>{c.subCategory ? c.subCategory.name : c.category.name}</p>
                        <div
                          className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                        >
                          <p className='text-xl font-bold'>{c.title}</p>
                          <Link
                            to={`/content/post/${c._id}`}
                            className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                          >
                            View
                          </Link>
                        </div>
                      </div>
                )}})}
            </div>}
            {type?.type === 'P' && <div>
              {filteredPost &&
                filteredPost.map(c => {
                  if (!c.approved) {
                    return(
                    <div  key={c._id}>
                      <p className='text-m'>{c.subCategory ? c.subCategory.name :c.category.name}</p>
                      <div
                        className='p-2 border border-gray-200 hover:border-gray-400 my-2 flex justify-between items-center text-black'
                      >
                        <p className='text-xl font-bold'>{c.title}</p>
                        <Link
                          to={`/content/post/${c._id}`}
                          className='bg-cyan-500 text-white rounded py-2 px-3 hover:bg-cyan-600'
                        >
                          View
                        </Link>
                      </div>
                    </div>
                )}})}
            </div>}
          </div>
        }
      </div>
    </div>
  );
};

export default AllPost;
