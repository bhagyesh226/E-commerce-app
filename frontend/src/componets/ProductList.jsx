import React, { useEffect, useState } from 'react';
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import EditProduct from './EditProduct';
import { toast } from 'react-toastify';
import summaryApi from '../../apiStore/api';

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

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(summaryApi.deleteProduct(productId).url, {
                method: summaryApi.deleteProduct(productId).method,
                headers: summaryApi.deleteProduct(productId).headers,
                credentials: "include"
            });

            const data = await response.json();

            if (data.success) {
                setProducts(prev => prev.filter(p => p._id !== productId));
                toast.success("Product deleted successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored"
                });
            } else {
                toast.error(data.message || "Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Server error while deleting product");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <p className="text-center py-10 text-blue-600 font-medium">Loading products...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
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

                        {/* Edit Button (responsive hover display) */}
                        <div
                            className="absolute bottom-2 right-10 bg-white border p-1 rounded-full shadow-md 
                            md:hidden block cursor-pointer hover:bg-gray-100"
                            onClick={() => setEditProduct(product)}
                        >
                            <MdEdit size={20} className="text-blue-600" />
                        </div>

                        <div
                            className="absolute bottom-2 right-10 bg-white border p-1 rounded-full shadow-md 
                            hidden md:group-hover:block cursor-pointer hover:bg-gray-100"
                            onClick={() => setEditProduct(product)}
                        >
                            <MdEdit size={20} className="text-blue-600" />
                        </div>

                        {/* Delete Button (always visible) */}
                        <div
                            className="absolute bottom-2 right-2 bg-white border p-1 rounded-full shadow-md 
                            cursor-pointer hover:bg-gray-100"
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            <MdDeleteOutline size={20} className="text-red-600" />
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
