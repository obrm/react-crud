import { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import api from './api/api';
import { getItem, setItem } from './services/localStorageService';

import {
  SharedLayout,
  Home,
  Login,
  Product,
  EditProduct,
  AddProduct,
  Cart,
  NotFound,
  ProtectedRoute
} from './pages';

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/products", {
          transformResponse: [
            (data) => {
              const parsedData = JSON.parse(data);
              return parsedData.products.slice(0, 8);
            }
          ]
        });
        setProducts(response.data);
        setItem('products', response.data);
      } catch (error) {
        console.error(error);
        setError({
          isError: true,
          message: error.response.data.message
        });
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const cartItems = getItem('cart');
    if (cartItems.length !== 0) {
      setCart(cartItems);
    }
  }, []);

  useEffect(() => {
    const userData = getItem('user');
    if (userData.length !== 0) {
      setUser(userData);
    }
  }, []);

  const routes = [
    {
      path: '/',
      element: <SharedLayout cart={cart} user={user} setUser={setUser} />,
      children: [
        {
          index: true,
          element: <Home products={products} cart={cart} setCart={setCart} loading={loading} error={error} />
        },
        {
          path: 'login',
          element: <Login user={user} setUser={setUser} />
        },
        {
          path: 'cart',
          element: <Cart cart={cart} setCart={setCart} products={products} />
        },
        {
          path: 'add',
          element: <ProtectedRoute user={user}><AddProduct /></ProtectedRoute>
        },
        {
          path: 'products',
          children: [
            {
              path: ':productId',
              element: <Product cart={cart} setCart={setCart} user={user} />
            },
            {
              path: ':productId/edit',
              element: <ProtectedRoute user={user}><EditProduct /></ProtectedRoute>
            }
          ]
        },
        {
          path: 'not-found',
          element: <NotFound />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ];

  const router = createBrowserRouter(routes);

  return (
    <Container>
      <RouterProvider router={router}>
      </RouterProvider>
    </Container>
  );
};

export default App;
