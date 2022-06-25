import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const DeletePostModal = ({handleCloseModal,postId,classes,post}) => {
    let categoryId
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();
    const handleDelete = async () => {
        try{
            await deletePost({postId});
            navigate('/archived');
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        const setCurrent = () => {
            categoryId = post.category._id;
        }
        setCurrent();
    },[post])
    return(
        <div
        className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            <h1 className='text-2xl font-bold my-5'>Delete Post</h1>
            <div className="mb-20">
                <p className="text-l font-bold">{`Are you sure you want to delete this post titled "${post.title}"?`}</p>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button type='danger' onClick={handleCloseModal}>
                    Close
                </Button>
                <Button type='danger' onClick={handleDelete}>
                    Delete Post
                </Button>
            </div>
        </div>
    )
}
export default DeletePostModal;