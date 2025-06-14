import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryWaiseProductDisplay from '../componets/CategoryWaiseProductDisplay';

function CategoryProduct() {
    const { categoryName } = useParams();

    return (
        <div className='pt-24 px-4'>
            <h2 className="text-2xl font-bold capitalize">
                <CategoryWaiseProductDisplay category={categoryName} heading={categoryName}/>
               
            </h2>
        </div>
    );
}

export default CategoryProduct;
