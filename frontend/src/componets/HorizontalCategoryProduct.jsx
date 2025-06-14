



import React, { useContext, useEffect, useRef } from 'react';
import fetchCategoryWiseProduct from '../../helper/fatchCategoryWaiseProduct';
import { Link } from 'react-router-dom';
import AddToCart from '../../helper/AddToCart';
import Context from '../context';

function HorizontalCategoryProduct({ category, heading }) {
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
    setLoading(false);
    setData(categoryProduct?.data || []);
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
          className='flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10'
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
            className='flex items-center gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10'
            
          >
            {data.map((product, index) => (
              <div
                key={product._id || index}
                className='rounded-2xl p-3 w-[270px] bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-2 shrink-0'
              >
                <Link to={'/ProductDetails/'+product._id} className='rounded-lg bg-blue-50 h-28 w-28 flex items-center justify-center overflow-hidden'>
                  <img
                    src={product?.image?.[0]}
                    alt={product?.name}
                    
                    className='h-full w-full mix-blend-multiply object-contain hover:scale-110 transition-transform duration-300'
                  />
                </Link>

                <div className='flex flex-col justify-between w-full'>
                  <div>
                    <h2 className='font-bold text-ellipsis line-clamp-1'>{product.name}</h2>
                    <p className='text-gray-600 text-xs'>{product.brands}</p>
                  </div>

                  <div className='mt-1 flex gap-2'>
                    <p className='text-base font-bold text-green-600'>₹{product.selling}</p>
                    <p className='text-base font-bold line-through text-gray-500'>₹{product.price}</p>
                  </div>

                  <button className='cursor-pointer rounded-lg h-[29px] w-full bg-blue-200 hover:bg-blue-400'
                  onClick={(e) => handleAddToCaet(e, product._id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default HorizontalCategoryProduct;
