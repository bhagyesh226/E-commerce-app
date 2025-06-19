import React, { useContext, useEffect, useState } from 'react';
import summaryApi from '../../apiStore/api';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import Context from '../context';
import { Link } from 'react-router-dom';

function CartProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const fatchData = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.addToCartViewProduct.url, {
      method: summaryApi.addToCartViewProduct.method,
      headers: summaryApi.addToCartViewProduct.headers,
      credentials: 'include',
    });
    setLoading(false);
    const dataApi = await response.json();
    if (dataApi.success) {
      setData(dataApi.data);
    }
  };

  useEffect(() => {
    fatchData();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(summaryApi.updataAddToCartProduct.url, {
      method: summaryApi.updataAddToCartProduct.method,
      headers: summaryApi.updataAddToCartProduct.headers,
      credentials: 'include',
      body: JSON.stringify({ _id: id, quantity: qty + 1 })
    });
    const dataresponse = await response.json();
    if (dataresponse.success) fatchData();
  };

  const decraseQty = async (id, qty) => {
    if (qty <= 1) return;
    const response = await fetch(summaryApi.updataAddToCartProduct.url, {
      method: summaryApi.updataAddToCartProduct.method,
      headers: summaryApi.updataAddToCartProduct.headers,
      credentials: 'include',
      body: JSON.stringify({ _id: id, quantity: qty - 1 })
    });
    const dataresponse = await response.json();
    if (dataresponse.success) fatchData();
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(summaryApi.deleteAddToCartProduct.url, {
      method: summaryApi.deleteAddToCartProduct.method,
      headers: summaryApi.deleteAddToCartProduct.headers,
      credentials: 'include',
      body: JSON.stringify({ _id: id })
    });
    const dataresponse = await response.json();
    if (dataresponse.success) {
      toast.success("Product removed from cart", {
        position: "top-right", autoClose: 2000, theme: "dark"
      });
      fatchData();
      context.feachUserAddtoCart();
    }
  };

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
  const totalPrice = data.reduce((total, item) => total + (item.productId?.selling || 0) * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center text-lg py-2 my-3">
        {!loading && data.length === 0 && (
          <h2 className="bg-slate-400 text-white py-2 rounded">No Data</h2>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* View Cart Items */}
        <div className="w-full max-w-3xl">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 items-center animate-pulse bg-gray-200 rounded p-4">
                  <div className="w-20 h-20 bg-gray-300 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-300 rounded" />
                    <div className="w-1/2 h-4 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            data.map((product) => (
              <div
                key={product?._id + 'add-to-cart'}
                className="flex gap-4 items-center bg-blue-50 border rounded-lg shadow-sm p-4 my-2"
              >
                <Link to={'/ProductDetails/' + product.productId?._id} className="w-24 bg-blue-50 rounded h-24">
                  {product.productId?.image?.[0] ? (
                    <img
                      src={product.productId.image[0]}
                      alt="product"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                      No image
                    </div>
                  )}
                </Link>

                <div className="flex-1 group relative">
                  {/* Always show on mobile */}
                  <MdDeleteForever
                    className="absolute top-1 right-1 text-red-500 text-xl cursor-pointer md:hidden block hover:text-red-700"
                    onClick={() => deleteCartProduct(product?._id)}
                  />
                  

                  {/* Show on hover for desktop */}
                  <MdDeleteForever
                    className="absolute top-1 right-1 text-red-500 hidden md:group-hover:block text-xl cursor-pointer hover:text-red-700"
                    onClick={() => deleteCartProduct(product?._id)}
                  />

                  <p className="font-semibold text-gray-800 mb-1">
                    {(product?.productId?.name || 'Unnamed Product').slice(0, 40)}
                    {product?.productId?.name?.length > 40 && '...'}
                  </p>
                  <p className="text-gray-500 text-sm mb-2">{product?.productId?.category}</p>

                  <div className="flex justify-between items-center mb-2">
                    <p className="text-green-600 font-bold text-base">₹{product?.productId?.selling}</p>
                    <p className="text-gray-700 font-medium text-sm">Total: ₹{product?.productId?.selling * product?.quantity}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">Qty:</p>
                    <button
                      className="h-8 w-6 border border-red-500 text-red-600 bg-transparent hover:bg-red-600 hover:text-white rounded shadow transition duration-200"
                      onClick={() => decraseQty(product._id, product.quantity)}
                    >−</button>
                    <span className="text-sm font-semibold">{product.quantity}</span>
                    <button
                      className="h-8 w-6 border border-red-500 text-red-600 bg-transparent hover:bg-red-600 hover:text-white rounded shadow transition duration-200"
                      onClick={() => increaseQty(product._id, product.quantity)}
                    >+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Price Summary */}
        <div className="mt-5 fixed right-15 top-16 lg:mt-0 w-full max-w-sm bg-yellow-50 p-5 h-fit rounded shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-center">Cart Summary</h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
            {data.map((product, index) => (
              <div key={index} className="flex justify-between text-sm border-b pb-1">
                <p className="w-1/2 truncate">{product?.productId?.name || 'Unnamed'}</p>
                <p className="w-1/4 text-center">{product.quantity}</p>
                <p className="w-1/4 text-right font-semibold">₹{product.productId?.selling * product.quantity}</p>
              </div>
            ))}
          </div>
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between font-bold text-base">
            <p>Total Items</p>
            <p>{totalQty}</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 w-full hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-200"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
