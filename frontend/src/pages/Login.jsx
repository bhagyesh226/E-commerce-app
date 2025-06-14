import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from '../assets/logo22.png';
import summaryApi from '../../apiStore/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../context';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
     const navigate = useNavigate();
     const {fetchUserDetails , feachUserAddtoCart} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    const dataresponse = await fetch(summaryApi.signin.url ,{
      method:summaryApi.signin.method,
      credentials:"include",
      headers:summaryApi.signin.headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })

    const dtaapi = await dataresponse.json()

    if(dtaapi.success){
      toast.success(dtaapi.message,{
        
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      })
      setEmail(''); // Reset email
    setPassword(''); // Reset password
 
    setTimeout(() => {
        navigate('/');
      }, 2000);
         fetchUserDetails(),
         feachUserAddtoCart()
    }

    if (dtaapi.error){
      toast.error(dtaapi.message,{
        
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      })
    }
    // Here you can add your API call or login logic

    // Reset form (optional)
    // setEmail('');
    // setPassword('');
  };

  return (
    <section id="login" className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-cover rounded-full bg-white-600"
            />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login to your account</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
