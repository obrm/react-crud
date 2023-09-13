import { Row, Col } from 'react-bootstrap';

import { Product, Message } from './../components';
import { Spinner } from './../components/layout';

const Home = ({ cart, setCart, products, loading, error }) => {

  return (
    <Row>
      {loading ? (
        <Spinner />
      ) : error.isError ? (
        <Message variant='danger' dismissible={false}>
            {error.message}
        </Message>
      ) : (
            products
          .map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} cart={cart} setCart={setCart} />
            </Col>
          ))
      )}
    </Row>
  );
};

export default Home;