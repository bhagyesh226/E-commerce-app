import React, { useState } from 'react';
import logo from '../assets/logo22.png';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

function AdminPanel() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const isDefaultPath = location.pathname === '/account';
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gray-800 text-white px-4 py-3 top-0 left-0 w-full z-50">
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
          <div className="mt-4 space-y-2">
            {user && (
              <div className="text-center mb-2">
                <p className="text-base font-semibold">{user.name}</p>
                <p className="text-sm text-gray-300">{user.email}</p>
                <p className="text-sm text-gray-400">{user.role}</p>
              </div>
            )}
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/account/allUsers" className="px-4 py-2 rounded hover:bg-gray-700" onClick={() => setShowMenu(false)}>All Users</Link>
              <Link to="/account/orders" className="px-4 py-2 rounded hover:bg-gray-700" onClick={() => setShowMenu(false)}>Orders</Link>
              <Link to="/account/Products" className="px-4 py-2 rounded hover:bg-gray-700" onClick={() => setShowMenu(false)}>Products</Link>
              <Link to="/account/Settings" className="px-4 py-2 rounded hover:bg-gray-700" onClick={() => setShowMenu(false)}>Settings</Link>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-gray-800 text-white py-6 flex-col items-center z-40">
        <div className="w-24 h-24 mb-4">
          <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full border-2 border-white" />
        </div>

        {user && (
          <div className="text-center mb-6">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
            <p className="text-sm text-gray-400">{user.role}</p>
          </div>
        )}

        <nav className="w-full text-sm space-y-4 px-4">
          <Link to="/account/allUsers" className="block px-4 py-2 rounded hover:bg-gray-700">All Users</Link>
          <Link to="/account/orders" className="block px-4 py-2 rounded hover:bg-gray-700">Orders</Link>
          <Link to="/account/Products" className="block px-4 py-2 rounded hover:bg-gray-700">Products</Link>
          <Link to="/account/Settings" className="block px-4 py-2 rounded hover:bg-gray-700">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="bg-gray-100 p-4 overflow-auto min-h-screen md:ml-64">
        <Outlet />
        {isDefaultPath && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Admin Panel</h1>
            <p className="text-gray-600">Select an option from the sidebar to begin managing your store.</p>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
