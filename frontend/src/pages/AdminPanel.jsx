import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function AdminPanel() {
  const userState = useSelector((state) => state.user);
  const user = userState?.user;

  const location = useLocation();
  const isDefaultPath = location.pathname === '/adminpanel';
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-800 text-white px-4 py-3 w-full fixed top-0 z-50 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-lg font-semibold">Admin Panel</span>
          </div>
          <button onClick={() => setShowMenu(!showMenu)}>
            <FaBars size={24} />
          </button>
        </div>

        {showMenu && (
          <div className="mt-4 space-y-2 bg-gray-700 p-4 rounded">
            {user && (
              <div className="text-center mb-2">
                <p className="text-base font-semibold">{user.name}</p>
                <p className="text-sm text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
            )}
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/adminpanel/alluser" className="px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowMenu(false)}>All Users</Link>
              <Link to="/adminpanel/orders" className="px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowMenu(false)}>Orders</Link>
              <Link to="/adminpanel/products" className="px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowMenu(false)}>Products</Link>
              <Link to="/adminpanel/settings" className="px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowMenu(false)}>Settings</Link>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col items-center bg-gray-800 text-white w-64 py-6 h-screen sticky top-0">
        <div className="w-24 h-24 mb-4">
          <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full border-2 border-white" />
        </div>

        {user && (
          <div className="text-center mb-6 px-2">
            <p className="text-lg font-semibold break-words">{user.name}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-400">{user.role}</p>
          </div>
        )}

        <nav className="w-full text-sm space-y-2 px-4">
          <Link to="/adminpanel/alluser" className="block px-4 py-2 rounded hover:bg-gray-700">All Users</Link>
          <Link to="/adminpanel/orders" className="block px-4 py-2 rounded hover:bg-gray-700">Orders</Link>
          <Link to="/adminpanel/products" className="block px-4 py-2 rounded hover:bg-gray-700">Products</Link>
          <Link to="/adminpanel/settings" className="block px-4 py-2 rounded hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 md:pt-4 md:ml-64">
        <Outlet />
        {isDefaultPath && (
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Admin Panel</h1>
            <p className="text-gray-600">Select an option from the sidebar to begin managing your store.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
