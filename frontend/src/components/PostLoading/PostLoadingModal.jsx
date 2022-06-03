import React, { useState } from "react";
import { MetroSpinner } from "react-spinners-kit";

const PostLoadingModal = (classes) => {
    const [loading, setLoading] = useState(true)

    return (
    
        <div className={`flex flex-row justify-center lg:w-656  sm:w-340 shadow-xl bg-white p-5 pl-0 rounded `}>

            <div className='justify-center mt-1 mb-1'>
                <MetroSpinner  size={40} color="#FF2400" />
            </div>

            <div className='justify-center ml-5 mt-2.5'>
                <p className='text-xl font-bold'>Loading, Kindly wait for a moment.</p>
            </div>       

        </div>
    );
}

export default PostLoadingModal