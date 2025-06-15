import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-green-100 text-gray-700 shadow-inner mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">ShivShaktiStore</h3>
          <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>

        <div className="flex gap-4">
          <Link to="/AboutUs" className="hover:text-green-600 text-sm">About Us</Link>
          <Link to="/AboutUs" className="hover:text-green-600 text-sm">Contact</Link>
          <Link to="/AboutUs" className="hover:text-green-600 text-sm">Privacy Policy</Link>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
