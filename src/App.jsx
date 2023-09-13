import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  SharedProductLayout,
  ProtectedRoute
} from './pages';

function App() {
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

        const response = await api.get(
          "/products",
          {
            transformResponse: [
              (data) => {
                const parsedData = JSON.parse(data);
                return parsedData.products.slice(0, 8);
              }
            ]
          }
        );

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

  return (
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<SharedLayout cart={cart} user={user} setUser={setUser} />}>
            <Route
              index
              element={<Home
                products={products}
                cart={cart}
                setCart={setCart}
                loading={loading}
                error={error} />} />
            <Route path='login' element={<Login user={user} setUser={setUser} />} />
            <Route path='cart' element={<Cart cart={cart} setCart={setCart} products={products} />} />
            <Route path='add' element={
              <ProtectedRoute user={user}>
                <AddProduct />
              </ProtectedRoute>
            } />

            <Route path='products' element={<SharedProductLayout />}>
              <Route path=':productId' element={<Product cart={cart} setCart={setCart} user={user} />} />
              <Route path=':productId/edit' element={
                <ProtectedRoute user={user}>
                  <EditProduct />
                </ProtectedRoute>
              } />
            </Route>

            <Route path='not-found' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
