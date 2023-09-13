import { Button } from 'react-bootstrap';

import { getItem, setItem } from './../services/localStorageService';

const AddToCartBtn = ({ disabled, cart, setCart, id }) => {

  const addToCart = () => {
    const products = getItem('products');
    const product = products.find((p) => p.id === id);
    // Check if the product is already in the cart
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      // Product is already in the cart, increase quantity by 1
      const newCart = [...cart];
      newCart[index].qty += 1;
      setCart(newCart);
      setItem("cart", newCart);
    } else {
      // Product is not in the cart, add it with quantity of 1
      const newCart = [...cart, { ...product, qty: 1 }];
      setCart(newCart);
      setItem("cart", newCart);
    }
  }

  return (
    <Button
      className='btn-block btn-brand'
      type='button'
      disabled={disabled}
      onClick={addToCart}
    >
      להוסיף לעגלה
    </Button>
  );
};

export default AddToCartBtn;
