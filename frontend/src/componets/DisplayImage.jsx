import React from 'react'
import { IoClose } from "react-icons/io5";

function DisplayImage({
    imgUrl,
    onClose
}) {
  return (
   <div className='flex flex-col h-[527px] w-[500px] items-center rounded-r-md justify-center p-4   shadow-md bg-white'>
        <div className='w-full h-10 flex items-center justify-end cursor-pointer' onClick={onClose}>
            <IoClose/>
        </div>
        <img
            src={imgUrl}
            alt="Product"
            className="w-full h-full object-contain rounded-md"
            />
    </div>
  )
}

export default DisplayImage