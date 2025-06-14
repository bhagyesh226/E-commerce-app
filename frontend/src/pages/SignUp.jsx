import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import logo from '../assets/logo22.png';
import summaryApi from '../../apiStore/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();




    // Simple validation example
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });

      return;
    }
    //  const data= await fetch()

    const response = await fetch(summaryApi.signUp.url, {
      method: summaryApi.signUp.method,
      headers: summaryApi.signUp.headers,
      body: JSON.stringify({
        name: fullName,
        email: email,
        password: password
      })
    })

    const apidata = await response.json()



    if (apidata.success) {
      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });


      setFullName(''); // Reset full name
      setEmail(''); // Reset email
      setPassword(''); // Reset password
      setConfirmPassword(''); // Reset confirm password
      setTimeout(() => {
        navigate('/Login');
      }, 2000);
    } else {
      toast.error(`${apidata.message}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"

      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }



  };

  return (
    <section id="signup" className="min-h-screen bg-gray-100 flex items-center justify-center">
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
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create your account</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {/* button for password show */}
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
            {/* button for password show */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
