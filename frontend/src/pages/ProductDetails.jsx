import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import summaryApi from '../../apiStore/api';
import VerticalCategoryProduct from '../componets/VerticalCategoryProduct';
import CategoryWaiseProductDisplay from '../componets/CategoryWaiseProductDisplay';
import Context from '../context';
import AddToCart from '../../helper/AddToCart';

function ProductDetails() {
  const { feachUserAddtoCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    feachUserAddtoCart();
  };

  const [data, setData] = useState({
    name: '',
    brands: '',
    category: '',
    image: [],
    description: '',
    price: '',
    selling: ''
  });

  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState('');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const imgRef = useRef(null);
  const params = useParams();

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.getProductDateils.url, {
      method: summaryApi.getProductDateils.method,
      headers: summaryApi.getProductDateils.headers,
      credentials: "include",
      body: JSON.stringify({ productId: params?.id })
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || {});
    setActiveImage(dataResponse?.data?.image?.[0] || '');
    setLoading(false);
  };

  const handelMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPosition({ x, y });
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <div className='pt-20 p-3 bg-green-50 min-h-screen container mx-auto'>
      {loading ? (
        // Skeleton loader
        <div className='min-h-[300px] flex w-fit flex-col lg:flex-row gap-6 bg-white shadow p-6 rounded-lg animate-pulse'>
          <div className='flex flex-col lg:flex-row gap-4'>
            <div className='flex gap-3 lg:flex-col max-h-80 overflow-y-auto'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='h-20 w-20 bg-gray-200 rounded'></div>
              ))}
            </div>
            <div className='h-80 w-80 bg-gray-200 rounded'></div>
          </div>
          <div className='flex flex-col gap-4 w-full'>
            <div className='h-5 w-28 bg-gray-200 rounded'></div>
            <div className='h-6 w-3/4 bg-gray-200 rounded'></div>
            <div className='h-4 w-20 bg-gray-200 rounded'></div>
            <div className='flex gap-4'>
              <div className='h-6 w-20 bg-gray-200 rounded'></div>
              <div className='h-6 w-16 bg-gray-200 rounded'></div>
            </div>
            <div className='h-20 w-full bg-gray-200 rounded'></div>
            <div className='flex gap-3 mt-4'>
              <div className='h-10 w-24 bg-gray-200 rounded'></div>
              <div className='h-10 w-24 bg-gray-200 rounded'></div>
            </div>
          </div>
        </div>
      ) : (
        <div className='min-h-[300px] flex w-fit flex-col lg:flex-row gap-6 bg-white shadow p-6 rounded-lg'>
          {/* Left: Images */}
          <div className='flex flex-col lg:flex-row gap-4'>

            {/* Thumbnail Images */}
            <div className='flex gap-3 lg:flex-col overflow-y-auto max-h-80 scrollbar-hide'>
              {data.image?.map((imgURL, index) => (
                <div className='h-20 w-20 bg-blue-50 rounded shadow cursor-pointer' key={index}>
                  <img
                    src={imgURL}
                    alt={`thumb-${index}`}
                    className='w-full h-full mix-blend-multiply object-contain p-1'
                    onMouseEnter={() => handelMouseEnterProduct(imgURL)}
                    onClick={() => handelMouseEnterProduct(imgURL)}
                  />
                </div>
              ))}
            </div>

            {/* 🔍 MAGNIFY ZOOM */}
            <div className='relative'>
              <div
                ref={imgRef}
                className='h-80 w-80 border rounded flex items-center justify-center bg-blue-50 overflow-hidden relative'
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
              >
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt='Main product'
                    className='w-full h-full object-contain mix-blend-multiply p-2'
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No Image</div>
                )}
              </div>

              {/* Zoom Box */}
              {showZoom && (
                <div className='absolute left-[330px] top-0 z-50 border bg-white shadow-lg h-80 w-80 border rounded overflow-hidden'>
                  <div
                    className='w-full h-full bg-no-repeat bg-contain'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: '200%'
                    }}
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right: Product Info */}
          <div className='flex flex-col gap-4 w-full'>
            <div className='h-3 w-fit'>
              <p className='text-sm p-1 text-blue-600 rounded bg-blue-100'>{data.brands}</p>
            </div>
            <h1 className='text-2xl font-bold text-gray-800'>{data.name}</h1>
            <p className='text-sm text-gray-600'>{data.category}</p>
            <div className='flex gap-4 items-center'>
              <span className='text-green-600 font-bold text-xl'>₹{data.selling}</span>
              <span className='line-through text-gray-400'>₹{data.price}</span>
            </div>
            <p className='text-sm text-gray-700'>{data.description}</p>
            <div className='flex gap-3 mt-4'>
              <button
                className='px-6 py-2 border border-blue-500 text-blue-600 bg-transparent hover:bg-blue-300 hover:text-white rounded shadow transition duration-200'
                onClick={(e) => handleAddToCart(e, data._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category-wise product suggestions */}
      <div>
        <CategoryWaiseProductDisplay category={data.category} heading={"other product like this"} />
      </div>
    </div>
  );
}

export default ProductDetails;
