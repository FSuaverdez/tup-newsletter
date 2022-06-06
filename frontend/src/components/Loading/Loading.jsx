import { MetroSpinner } from "react-spinners-kit";

const Loading = () => {
    return(
        <div className='my-20'>
            <div className='flex justify-center mt-1 mb-1'>
                <MetroSpinner  size={40} color="#FF2400" />
            </div>

            <div className='flex justify-center ml-5 mt-2.5'>
                <p className='text-xl font-bold'>Loading, Kindly wait for a moment.</p>
            </div>   
        </div>  
    )
}
export default Loading;