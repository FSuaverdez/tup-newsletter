import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const ArchivePostModal = ({handleCloseModal,handleCloseArchivedModal,postId,classes,post}) => {
    let categoryId
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();
    return(
        <div
        className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            <h1 className='text-2xl font-bold my-5'>Archive Post</h1>
            <div className="mb-20">
                <p className="text-l font-bold">{`Are you sure you want to archive this post titled "${post.title}"? The Post's Publish Date is ${post.approvedAt.slice(0,10)}`}</p>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button type='danger' onClick={handleCloseModal}>
                    Close
                </Button>
                <Button type='danger' onClick={handleCloseArchivedModal}>
                    Archive Post
                </Button>
            </div>
        </div>
    )
}
export default ArchivePostModal;