import React, { useState, useEffect } from 'react';
import { FaAngleDoubleLeft,FaAngleDoubleRight  } from "react-icons/fa";
import banner1 from '../assets/banner/img1.png';
import banner2 from '../assets/banner/img2.webp';
import banner3 from '../assets/banner/img3.jpg';
import banner4 from '../assets/banner/img4.jpg';
import banner5 from '../assets/banner/img5.webp';

// // for modile 
// import banner6 from '../assets/banner/img1_mobile.jpg';
// import banner7 from '../assets/banner/img2_mobile.webp';
// import banner8 from '../assets/banner/img3_mobile.jpg';
// import banner9 from '../assets/banner/img4_mobile.jpg';
// import banner10 from '../assets/banner/img5_mobile.png';


const images = [banner1, banner2, banner3 ,banner4,banner5];

function BannerProduct() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="container mx-auto px-4 pt-2 overflow-hidden relative">
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-full object-cover rounded-2xl"
        />

        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
          aria-label="Previous Slide"
        >
          <FaAngleDoubleLeft/>
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
          aria-label="Next Slide"
        >
          <FaAngleDoubleRight/>
        </button>
      </div>
    </div>
  );
}

export default BannerProduct;
