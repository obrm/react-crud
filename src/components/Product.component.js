import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { calcAndFormatPrice } from './../utils/index';

import AddToCartBtn from './AddToCartBtn.component'

const Product = ({ product, cart, setCart }) => {
  const price = calcAndFormatPrice(product.price);

  return (
    <Card className='my-3 p-3 rounded card-main card-main-sm card-main-md'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.thumbnail} variant='top' alt={product.name} style={{ maxHeight: '10rem' }} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as='div' className='mt-1-sm'>
            <strong>
              {product.title}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>          
        </Card.Text>
        <Card.Text as='h5' className='mb-3'>
          {price} ש"ח{' '}
          <small>{product.stock === 0 && ` (חסר במלאי)`}</small>
        </Card.Text>
        <AddToCartBtn disabled={product.stock === 0} setCart={setCart} cart={cart} id={product.id} />
      </Card.Body>
    </Card>
  );
};

export default Product;
