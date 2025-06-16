import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import logo from '../assets/ss.png';
import summaryApi from '../../apiStore/api';
import { setUserData } from "../store/userSlice";
import userRole from '../routes/role';
import { useContext } from 'react';
import Context from '../context';

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context)



  console.log("User from context:", user); // Add this

  const handleLogout = async () => {
    const res = await fetch(summaryApi.user_Louout.url, {
      method: summaryApi.user_Louout.method,
      credentials: 'include',
    })

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

  console.log("user id",user?._id)

  const handleSearch = (e) => {
    const { value } = e.target

    if (value) {
      navigate(`/SearchProduct?q=${value}`);
    }
    else {
      navigate(`/SearchProduct`);
    }
  }
  return (
    <nav className="fixed top-0 left-0 w-full  z-50 bg-green-100 shadow-md px-6 py-2 flex items-center justify-between">
      <div className="relative z-50">
        <Link to="/" className="flex items-center gap-2 group relative">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 object-contain rounded-full transition-transform duration-300"
            title="ShivShaktiStore"
          />

          {/* Hover Circle */}
          <div className="hidden group-hover:flex absolute -top-36 -left-36 w-[350px] h-[350px] rounded-full  bg-opacity-70 shadow-2xl transition-all duration-500 items-center justify-center">
            {/* Inner circle */}
            <div className='w-[300px] h-[300px] rounded-full bg-gray-900 shadow-2xl flex items-center justify-center p-4'>
              <div className='w-[250px] h-[250px] rounded-full bg-gray-800 shadow-2xl flex items-center justify-center p-4'>
                <div className="w-[200px] h-[200px] rounded-full bg-gray-700 shadow-2xl flex items-center justify-center p-4">
                  <div className="text-right text-white mt-5 -mr-3">
                    <h1 className="text-xl font-bold leading-tight">Shiv Shakti</h1>
                    <h3 className="text-base font-medium tracking-widest">S t o r e</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-1 mx-6 max-w-md relative">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!user?._id} // 👈 disable if not logged in
        />
        <CiSearch className="absolute left-3 text-xl text-gray-500" />
      </div>

      <div className="flex items-center gap-6 p-2">
        {user?._id ? (
          <>
            {/* Account icon with name */}
            <div className="relative group">
              <Link
                to={user?.role === userRole.ADMIN ? "/account" : "/UserPanel"}
                className="text-2xl text-gray-700 hover:text-blue-600"
              >
                <FaUserAlt />
              </Link>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-2 py-1 text-sm bg-black text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {user.name}
              </div>
            </div>

            {/* Cart icon */}
            <Link
              to="/CartProduct"
              className="text-2xl text-gray-700 hover:text-blue-600 relative"
            >
              <IoCartOutline />
              <div className="bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-xs">{context?.cartProductCount}</p>
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-gray-700 hover:text-red-600"
            >
              Logout <FiLogIn />
            </button>
          </>
        ) : (
          // Only login shown if not authenticated
          <Link to="/login" className="text-2xl text-gray-700 hover:text-blue-600">
            <FiLogIn />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
