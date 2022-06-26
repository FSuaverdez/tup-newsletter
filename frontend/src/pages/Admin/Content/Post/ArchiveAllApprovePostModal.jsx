import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeletePostMutation } from '../../../../app/services/postApi';
import Button from '../../../../components/Button/Button';

const ArchiveAllApprovePostModal = ({handleCloseModal,handleArchiveAllPost,postId,classes,name}) => {

    return(
        <div
        className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            <h1 className='text-2xl font-bold my-5'>Archive Posts</h1>
            <div className="mb-20">
                <p className="text-l font-bold">{`Are you sure you want to archive all Approved Posts frome "${name}"?`}</p>
            </div>
            <div className='flex gap-2 justify-end'>
                <Button type='danger' onClick={handleCloseModal}>
                    Close
                </Button>
                <Button type='danger' onClick={handleArchiveAllPost}>
                    Archive Posts
                </Button>
            </div>
        </div>
    )
}
export default ArchiveAllApprovePostModal;