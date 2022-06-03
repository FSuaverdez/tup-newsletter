import Button from '../Button/Button';

const PostCompleteModal = ({classes,handleCloseCompleted}) => {

    return (
        <div
        className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            <p className='text-xl font-bold'>Your post is now submitted. It is now pending for approval.</p>

            <div className='flex gap-2 justify-end mt-20'>
                <Button type='success' onClick={handleCloseCompleted}>
                        Close
                </Button>
            </div>

        </div>
    )
}
export default PostCompleteModal