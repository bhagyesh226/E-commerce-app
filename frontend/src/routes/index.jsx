import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import Products from '../pages/Products';
import CategoryProduct from '../pages/CategoryProduct';
import UserPanel from '../pages/UserPanel';
import ProductDetails from '../pages/ProductDetails';
import CartProduct from '../pages/CartProduct';
import CategoryWaiseProductDisplay from '../componets/CategoryWaiseProductDisplay';
import SearchProduct from '../pages/SearchProduct';
import Settings from '../pages/Settings';
import Orders from '../pages/Orders';
import AboutUs from '../pages/AboutUs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <SignUp />
      },
      {
        path: '/category/:categoryName',
        element: <CategoryProduct />
      },

      {
        path: '/SearchProduct',
        element: <SearchProduct />
      },
      {
            path : '/AboutUs',
            element : <AboutUs/>
      },
      {
        path: '/ProductDetails/:id',
        element: <ProductDetails />
      },
      {
        path: '/CartProduct',
        element: <CartProduct />
      },
      {
        path : '/UserPanel',
        element : <UserPanel />,
        children: [
          {
            
            // path: '/Settings',
            path: 'Settings',
            element: <Settings />
          
          }
        ]
      },
      {
        path: '/account',
        element: <AdminPanel />,
        children: [
          {
            path: 'allUsers',
            element: <AllUsers />
          },
          {
            path : 'orders',
            element : <Orders/>
          },
          {
            path: 'Settings',
            element: <Settings />
          },
          {
            path: 'Products',
            element: <Products />
          },
          


        ]

      }
    ]
  }
]);

export default router;