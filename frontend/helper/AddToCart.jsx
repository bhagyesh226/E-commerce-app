import summaryApi from "../apiStore/api";
import { toast } from 'react-toastify';

const AddToCart = async (e, id) => {
  e.stopPropagation();
  e.preventDefault();

  try {
    const response = await fetch(summaryApi.addToCartProduct.url, {
      method: summaryApi.addToCartProduct.method,
      headers: summaryApi.addToCartProduct.headers,
      credentials: 'include',
      body: JSON.stringify({
        productId: id
      })
    });

    const dataResponse = await response.json();

    if (dataResponse.success) {
      toast.success(dataResponse.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
    } else {
      toast.warning(dataResponse.message || "Something went wrong", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
    }

  } catch  {
    toast.error("Failed to add to cart", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark"
    });
  }
};

export default AddToCart;
