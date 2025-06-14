import React, { useContext, useEffect, useRef } from 'react';
import fetchCategoryWiseProduct from '../../helper/fatchCategoryWaiseProduct';
import { Link } from 'react-router-dom';
import AddToCart from '../../helper/AddToCart';
import Context from '../context';

function VerticalCategoryProduct({ category, heading }) {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const scrollRef = useRef(null);

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
            <h2 className='text-2xl font-semibold mb-3'>{heading}</h2>

            {loading ? (
                <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
        >
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className='rounded-2xl p-3 w-[270px] bg-gray-100 animate-pulse shadow-inner flex gap-2 shrink-0'
            >
              <div className='rounded-lg bg-gray-300 h-28 w-28' />

              <div className='flex flex-col justify-between w-full'>
                <div>
                  <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                  <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                </div>

                <div className='mt-3 flex gap-2'>
                  <div className='h-4 w-16 bg-gray-300 rounded'></div>
                  <div className='h-4 w-10 bg-gray-300 rounded'></div>
                </div>

                <div className='mt-2 h-[29px] w-full bg-gray-300 rounded'></div>
              </div>
            </div>
          ))}
        </div>
            ) : (
                <div className='relative'>
                    <div
                        ref={scrollRef}
                        className='flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2'
                    >
                        {data.map((product, index) => (
                            <div
                                key={product._id || index}
                                className='w-[220px] flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-3 flex flex-col items-center'
                            >
                                <Link to={'/ProductDetails/'+product._id} className='w-full p-2 h-36 bg-blue-100 rounded-xl overflow-hidden mb-3'>
                                    <img
                                        src={product?.image?.[0]}
                                        alt={product.name}
                                        className='w-full h-full mix-blend-multiply object-contain hover:scale-105 transition-transform duration-300'
                                    />
                                </Link>

                                <h2 className='text-base font-semibold line-clamp-1 text-center'>{product.name}</h2>
                                <p className='text-sm text-gray-500 line-clamp-1'>{product.brands}</p>

                                <div className='flex justify-start items-center gap-2 mt-2'>
                                    <p className='text-green-600 font-bold text-sm'>₹{product.selling}</p>
                                    <p className='text-gray-500 line-through text-sm'>₹{product.price}</p>
                                </div>


                                <button className='mt-3 w-full h-9 rounded-md bg-blue-200 hover:bg-blue-400 text-sm font-medium'
                                onClick={(e)=>handleAddToCaet(e,product._id )}> 
                                    Add to cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerticalCategoryProduct;

