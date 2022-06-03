import Button from '../Button/Button';

const PostCompleteModal = ({classes,handleCloseCompleted}) => {

    return (
        <div
        className={`flex flex-row lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            <div className='ml-3 mt-1.5'>
                <p className='text-xl font-bold'>Your post is now submitted. Pending for admin approval.</p>
            </div>

            <div className='ml-5 mt-0.5'>
                <Button type='success' onClick={handleCloseCompleted}>
                        Close
                </Button>
            </div>

        </div>
    )
}
export default PostCompleteModal