import React from 'react';
import UplodaProduct from '../componets/UplodaProduct';
import ProductList from '../componets/ProductList';

function Products() {
  const [openUP, setOpenUP] = React.useState(false);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Products</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpenUP(true)}
        >
          Add Product
        </button>
      </div>

      {openUP && <UplodaProduct onClose={() => setOpenUP(false)} />}

      <ProductList />
    </div>
  );
}

export default Products;
