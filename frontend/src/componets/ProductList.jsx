
import React, { useEffect, useState } from 'react';
import summaryApi from '../../apiStore/api';
import { MdEdit } from "react-icons/md";
import EditProduct from './EditProduct';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editProduct, setEditProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await fetch(summaryApi.getProduct.url, {
                method: summaryApi.getProduct.method,
                headers: summaryApi.getProduct.headers,
                credentials: "include"
            });
            const data = await response.json();
            if (data.success) {
                setProducts(data.data);
            } else {
                console.error(data.message);
            }
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product) => (
                    <div
                        key={product._id}
                        className="group relative border p-4 rounded-md shadow-md bg-white hover:shadow-lg transition-transform transform hover:scale-105 w-full max-w-[280px] mx-auto"
                    >
                        {/* Product Image */}
                        <div className="h-40 w-full flex items-center justify-center overflow-hidden rounded bg-gray-100">
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="h-full w-auto object-contain"
                            />
                        </div>

                        {/* Product Name */}
                        <h3 className="text-base font-medium mt-2 truncate">{product.name}</h3>

                        {/* Product Price and Selling Price */}
                        <div className="mt-1">
                            <span className="text-green-600 font-semibold text-sm">₹{product.selling}</span>{' '}
                            <span className="line-through text-gray-400 text-sm">₹{product.price}</span>
                        </div>

                        {/* Edit Icon (Shown on Hover) */}
                        <div
                            className="absolute bottom-2 right-2 bg-white border p-1 rounded-full shadow-md 
             md:hidden block cursor-pointer hover:bg-gray-100"
                            onClick={() => setEditProduct(product)}
                        >
                            <MdEdit size={20} />
                        </div>

                        <div
                            className="absolute bottom-2 right-2 bg-white border p-1 rounded-full shadow-md 
             hidden md:group-hover:block cursor-pointer hover:bg-gray-100"
                            onClick={() => setEditProduct(product)}
                        >
                            <MdEdit size={20} />
                        </div>

                    </div>
                ))
            )}

            {/* Edit Product Modal */}
            {editProduct && (
                <EditProduct product={editProduct} onClose={() => setEditProduct(null)} />
            )}
        </div>
    );
}

export default ProductList;
