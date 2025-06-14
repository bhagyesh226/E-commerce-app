import React from 'react';
import summaryApi from '../../apiStore/api';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.categoryProduct.url, {
      method: summaryApi.categoryProduct.method,
      headers: summaryApi.categoryProduct.headers,
    });
    const dataresponse = await response.json();
    setLoading(false);
    setCategories(dataresponse.data);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto px-12 py-3">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="flex overflow-x-auto overflow-y-hidden gap-4 scrollbar-hide">

          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.category}`}
              className="flex-shrink-0 text-center p-1  cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <div className="w-20 h-20 rounded-full bg-blue-100 overflow-hidden border shadow hover:shadow-lg hover:bg-gray-100 transition-all duration-300">
                <img
                  src={category?.image?.[0]}
                  alt={category?.category}
                  className="h-full w-full object-contain mix-blend-multiply p-2"
                />
              </div>
              <p className="text-xs mt-2 capitalize whitespace-nowrap">{category?.category}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryList;
