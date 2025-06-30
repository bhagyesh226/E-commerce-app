import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
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
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
      dispatch(setUserData(null));
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error(data.message || "Logout failed", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    navigate(value ? `/SearchProduct?q=${value}` : `/SearchProduct`);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-green-100 shadow-md px-4 py-3 flex items-center justify-between md:px-6">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 relative group">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-contain" title="ShivShaktiStore" />
        {/* Hover Circle - hidden on mobile */}
        <div className="hidden md:flex absolute -top-36 -left-36 w-[350px] h-[350px] rounded-full group-hover:flex bg-opacity-70 shadow-2xl items-center justify-center">
          <div className='w-[300px] h-[300px] rounded-full bg-gray-900 flex items-center justify-center p-4'>
            <div className='w-[250px] h-[250px] rounded-full bg-gray-800 flex items-center justify-center p-4'>
              <div className="w-[200px] h-[200px] rounded-full bg-gray-700 flex items-center justify-center p-4">
                <div className="text-right text-white mt-5 -mr-3">
                  <h1 className="text-xl font-bold">Shiv Shakti</h1>
                  <h3 className="text-base tracking-widest">S t o r e</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 mx-6 max-w-md relative">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          disabled={!user?._id}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <CiSearch className="absolute left-3 text-xl text-gray-500" />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-2xl text-gray-800"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {user?._id ? (
          <>
            <Link
              to={user.role === userRole.ADMIN ? "/account" : "/UserPanel"}
              className="text-2xl text-gray-700 hover:text-blue-600"
              title="Account"
            >
              <FaUserAlt />
            </Link>
            <Link to="/CartProduct" className="relative text-2xl text-gray-700 hover:text-blue-600">
              <IoCartOutline />
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
                {context?.cartProductCount || 0}
              </span>
            </Link>
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

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:hidden z-40">
          {user?._id ? (
            <>
              <Link to={user.role === userRole.ADMIN ? "/account" : "/UserPanel"} className="flex items-center gap-2 text-gray-700">
                <FaUserAlt /> {user.name}
              </Link>
              <Link to="/CartProduct" className="flex items-center gap-2 text-gray-700">
                <IoCartOutline /> Cart ({context?.cartProductCount || 0})
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                Logout <FiLogIn />
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-gray-700">
              <FiLogIn /> Login
            </Link>
          )}

          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              disabled={!user?._id}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-gray-500" />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
