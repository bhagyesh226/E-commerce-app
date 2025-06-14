
import React from 'react';
import { useNavigate } from 'react-router-dom';
import productCategory from '../../helper/ProductCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import UplodeImage from '../../helper/UplodeImage';
import DisplayImage from './DisplayImage';
import summaryApi from '../../apiStore/api';
import { toast } from 'react-toastify';


function UplodaProduct() {
    const navigate = useNavigate();

    const goback = () => {
        navigate('/account');
    };

    const [data, setData] = React.useState({
        name: '',
        brands: '',
        category: '',
        image: [],
        description: '',
        price: '',
        selling: ''
    });

    const [openFullImage, setOpenFullImage] = React.useState(false);
    const [activeImage, setActiveImage] = React.useState("");

    const handalUploadImage = async (e) => {
        const file = e.target.files[0];




        const uplodeImageCloudinary = await UplodeImage(file)

        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, uplodeImageCloudinary.url]
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(summaryApi.uploadProduct.url, {
            method: summaryApi.uploadProduct.method,
            headers: summaryApi.uploadProduct.headers,
            credentials: 'include',
            body: JSON.stringify(data)
        })

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message, {
                position: "top-right",
                autoClose: 1000,
                theme: "dark"
            });
            setTimeout(() => {
                navigate('/account');
            }, 2000);
        }

        if (responseData.error) {
            toast.error(responseData.message, {
                position: "top-right",
                autoClose: 2000,
                theme: "dark"
            });
        }


    };

    const handleDeleteImage = async (index) => {

        const updatedImages = [...data.image];
        updatedImages.splice(index, 1);
        setData((prev) => ({
            ...prev,
            image: [...updatedImages]
        }));


    }

    return (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50'>
            <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[90%] overflow-y-auto'>

                <h3 className='text-lg font-bold mb-4 text-center'>Upload Product</h3>

                <form onSubmit={handleSubmit} className='space-y-4'>

                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="text"
                        name="brands"
                        value={data.brands}
                        onChange={handleChange}
                        placeholder="Brand"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <select
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        className='w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        <option value="">Select category</option>
                        {productCategory.map((el, index) => (
                            <option key={el.value + index} value={el.value}>
                                {el.label}
                            </option>
                        ))}
                    </select>


                    <div className='flex items-center justify-center border-2 border-dashed rounded-md p-4'>
                        <label htmlFor="image-upload" className='cursor-pointer'>
                            <div className='flex items-center justify-center text-gray-500 cursor-pointer'>
                                <FaCloudUploadAlt />
                                <p className='text-gray-500 ml-2'>Click or drag to upload image</p>
                                <input
                                    type="file"
                                    id="image-upload"
                                    className="hidden"
                                    onChange={handalUploadImage}
                                />

                            </div>
                        </label>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-4'>
                        {data?.image[0] ? (
                            data.image.map((el, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={el}
                                        alt="Product"
                                        className="w-[100px] h-[100px] object-contain  bg-slate-100 border cursor-pointer rounded-md p-1"
                                        onClick={() => {
                                            setOpenFullImage(true);
                                            setActiveImage(el);
                                        }}
                                    />
                                    <div
                                        className="absolute bottom-1 right-1  text-white p-1 rounded-full hidden cursor-pointer group-hover:block hover:bg-red-600"
                                        onClick={() => handleDeleteImage(index)} // optional: handle delete function
                                    >
                                        <MdDeleteForever size={18} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className='text-red-500 text-sm'>Please upload an image</p>
                        )}
                    </div>

                    <input
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        placeholder="Price (₹)"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="number"
                        name="selling"
                        value={data.selling}
                        onChange={handleChange}
                        placeholder="Selling Price (₹)"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Product Description"
                        rows="3"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required />

                    <div className="flex justify-between gap-4 pt-2">
                        <button
                            type="button"
                            onClick={goback} 
                            className="w-1/2 border border-gray-400 text-gray-700 py-2 rounded-md hover:bg-gray-100 transition-all">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            {
                openFullImage && (
                    <DisplayImage onClose={() => setOpenFullImage(false)} imgUrl={activeImage} />
                )
            }
        </div>
    );
}

export default UplodaProduct;
