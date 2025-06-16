import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import summaryApi from '../../apiStore/api';
import Context from '../context';
import AddToCart from '../../helper/AddToCart';

function SearchProduct() {
  const location = useLocation();
  const [loading,setLoading] = useState(false)
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');

   const { feachUserAddtoCart} = useContext(Context)
  
       const handleAddToCaet = async (e,id)=>{
          await AddToCart(e,id),
          feachUserAddtoCart()
  
       }

  const [products, setProducts] = useState([]);

  const fetchSearchResults = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${summaryApi.searchProductData.url}?q=${searchQuery}`, {
        method: summaryApi.searchProductData.method,
        headers: summaryApi.searchProductData.headers,
        credentials: "include"
      });
      setLoading(false)

      const data = await res.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        console.error("Failed to fetch search results");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // console.log('data of search',products)
  // console.log('First image of product:', products.productImage?.[0]);


  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
   <div className="px-4 pt-24 pb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">
        Search Results for: "<span className="text-green-600">{searchQuery}</span>"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // Loading Skeleton - directly in JSX, no separate function
          [...Array(8)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl p-4 bg-gray-100 shadow-inner animate-pulse flex flex-col gap-3"
            >
              <div className="h-48 bg-gray-300 rounded-lg" />
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-1/2" />
              <div className="flex justify-between items-center">
                <div className="h-6 w-16 bg-gray-300 rounded" />
                <div className="h-4 w-12 bg-gray-300 rounded" />
              </div>
              <div className="h-10 bg-gray-300 rounded w-full" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-xl shadow-md hover:shadow-lg transition-all bg-white"
            >
              <Link
                to={'/ProductDetails/' + product._id}
                className="w-full h-48 mb-3 bg-white flex items-center justify-center overflow-hidden rounded-lg"
              >
                <img
                  src={product.image?.[0] || '/placeholder.png'}
                  alt={product.name}
                  className="h-full object-contain"
                />
              </Link>
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-1">
                {product.category} | {product.brands}
              </p>
              <div className="flex justify-between mt-3 items-center">
                <span className="text-green-600 font-bold text-base">₹{product.selling}</span>
                <span className="line-through text-gray-400 text-sm">₹{product.price}</span>
              </div>
              <button
                onClick={(e) => handleAddToCaet(e, product._id)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
