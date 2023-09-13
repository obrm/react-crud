import { calcAndFormatPrice } from '../utils/index';

import { CartItem } from '../components';
import { setItem } from '../services/localStorageService';

const Cart = ({ cart, setCart }) => {
  const handleClearCart = () => {
    setCart([]);
    setItem('cart', []);
  };

  let total = cart.map((product) => product.price * product.qty).reduce((acc, cur) => acc + cur, 0); 

  total = calcAndFormatPrice(total);

  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>עגלת קניות</h2>
          <h4 className='empty-cart'>אין מוצרים</h4>
        </header>
      </section>
    );
  }
  return (
    <section className='cart'>
      <header>
        <h2>עגלת הקניות שלך</h2>
      </header>
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} cart={cart} setCart={setCart} />;
        })}
      </div>
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            סך הכל <span>{total} ש"ח</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={handleClearCart}>
          הסרת כל המוצרים
        </button>
      </footer>
    </section>
  );
};

export default Cart;
