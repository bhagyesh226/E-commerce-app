import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";
import logo from '../assets/ss.png';
import summaryApi from '../../apiStore/api';
import { setUserData } from "../store/userSlice";
import userRole from '../routes/role';
import { useContext, useState } from 'react';
import Context from '../context';

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const res = await fetch(summaryApi.user_Louout.url, {
      method: summaryApi.user_Louout.method,
      credentials: 'include',
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message, { autoClose: 2000, theme: "dark" });
      dispatch(setUserData(null));
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error(data.message || "Logout failed", { autoClose: 2000, theme: "dark" });
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    navigate(value ? `/SearchProduct?q=${value}` : `/SearchProduct`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-100 shadow-md px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain rounded-full" title="ShivShaktiStore" />
        <span className="font-bold text-xl hidden sm:inline">ShivShakti</span>
      </Link>

      {/* Search Bar - hidden on mobile */}
      <div className="hidden md:flex items-center justify-center flex-1 mx-4 max-w-md relative">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          disabled={!user?._id}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CiSearch className="absolute left-3 text-xl text-gray-500" />
      </div>

      {/* Desktop Nav - hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        {user?._id ? (
          <>
            {/* Account Icon - desktop only */}
            <Link
              to={user.role === userRole.ADMIN ? "/account" : "/UserPanel"}
              className="text-2xl text-gray-700 hover:text-blue-600"
            >
              <FaUserAlt />
            </Link>

            {/* Cart Icon */}
            <Link
              to="/CartProduct"
              className="relative text-2xl text-gray-700 hover:text-blue-600"
            >
              <IoCartOutline />
              <div className="bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3 text-xs">
                {context?.cartProductCount}
              </div>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600"
            >
              Logout <FiLogIn />
            </button>
          </>
        ) : (
          <Link to="/login" className="text-2xl text-gray-700 hover:text-blue-600">
            <FiLogIn />
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle - visible on mobile only */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer - visible only when menuOpen and on mobile */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-green-100 shadow-md flex flex-col p-4 gap-4 md:hidden z-50">
          {user?._id && (
            <div className="flex items-center gap-4">
              <FaUserAlt className="text-xl" />
              <span>{user.name}</span>
            </div>
          )}

          <div className="flex items-center border px-3 py-2 rounded-full">
            <CiSearch className="text-xl text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              disabled={!user?._id}
              className="flex-1 pl-2 outline-none bg-transparent"
            />
          </div>

          {user?._id ? (
            <>
              <Link to="/CartProduct" className="flex items-center gap-2 text-gray-700">
                <IoCartOutline /> Cart ({context?.cartProductCount})
              </Link>

              {/* Account Text Link ONLY in mobile drawer */}
              <Link
                to={user.role === userRole.ADMIN ? "/account" : "/UserPanel"}
                className="text-gray-700"
              >
                Account
              </Link>

              <button onClick={handleLogout} className="text-left text-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
