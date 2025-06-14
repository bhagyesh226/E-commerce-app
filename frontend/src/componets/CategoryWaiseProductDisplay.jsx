import React, { useContext, useEffect, useState } from 'react';
import fetchCategoryWiseProduct from '../../helper/fatchCategoryWaiseProduct';
import { Link } from 'react-router-dom';
import AddToCart from '../../helper/AddToCart';
import Context from '../context';

function CategoryWaiseProductDisplay({ category, heading }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

     const { feachUserAddtoCart} = useContext(Context)

     const handleAddToCaet = async (e,id)=>{
        await AddToCart(e,id),
        feachUserAddtoCart()

     }

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setData(categoryProduct?.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className='container mx-auto px-5 my-6'>
            <h2 className='text-2xl font-semibold mb-4'>{heading}</h2>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className='rounded-2xl p-3 bg-gray-100 animate-pulse shadow-inner flex flex-col gap-2'
                        >
                            <div className='rounded-lg bg-gray-300 h-36 w-full' />
                            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                            <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                            <div className='h-4 w-20 bg-gray-300 rounded'></div>
                            <div className='h-9 w-full bg-gray-300 rounded'></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {data.map((product, index) => (
                        <div
                            key={product._id || index}
                            className='bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-3 flex flex-col items-center'
                        >
                            <Link to={`/ProductDetails/${product._id}`} className='w-full h-36 bg-blue-100 rounded-xl overflow-hidden mb-3'>
                                <img
                                    src={product?.image?.[0]}
                                    alt={product.name}
                                    className='w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300 p-1'
                                />
                            </Link>

                            <h2 className='text-base font-semibold line-clamp-1 text-center'>{product.name}</h2>
                            <p className='text-sm text-gray-500 line-clamp-1'>{product.brands}</p>

                            <div className='flex justify-center items-center gap-2 mt-2'>
                                <p className='text-green-600 font-bold text-sm'>₹{product.selling}</p>
                                <p className='text-gray-500 line-through text-sm'>₹{product.price}</p>
                            </div>

                            <button className='mt-3 w-full h-9 rounded-md bg-blue-200 hover:bg-blue-300 text-sm font-medium'
                            onClick={(e) => handleAddToCaet(e, product._id)}>
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryWaiseProductDisplay;
