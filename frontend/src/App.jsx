
import './App.css'
import { Outlet } from 'react-router-dom'
import Navber from './componets/Navber'
import Footer from './componets/Footer'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import summaryApi from '../apiStore/api';
// import { ContextProvider } from './context'; // ✅ use ContextProvider
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserData } from './store/userSlice';
import { useState } from 'react';



function App() {

  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {

    const response = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: 'include'
    })
    const dataapi = await response.json();
    if (dataapi.success) {
      dispatch(setUserData(dataapi.data));
    }


  }

  const feachUserAddtoCart = async () =>{
    const response = await fetch(summaryApi.CountAddToCartProduct.url, {
      method: summaryApi.CountAddToCartProduct.method,
      credentials: 'include'
    })
    const dataapi = await response.json();
    setCartProductCount(dataapi?.data.count)

    

  }

  useEffect(() => {
    // user data
    fetchUserDetails();
    feachUserAddtoCart();
  }, [])

  return (
    <>
      <Context.Provider value={{ fetchUserDetails , cartProductCount ,feachUserAddtoCart }}>
        {/* Full height flex container */}
        <div className="min-h-screen flex flex-col">
          <ToastContainer />
          <Navber />

          {/* Main content grows to fill space */}
          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>
      </Context.Provider>
    </>
  )
}

export default App
