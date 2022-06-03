
const PostLoadingModal = (classes) => {

    return (
        <div
        className={`lg:w-656  sm:w-340 shadow-xl bg-white p-5 rounded ${classes}`}
        onClick={e => e.stopPropagation()}
        >
            Loading...
        </div>
    )
}
export default PostLoadingModal