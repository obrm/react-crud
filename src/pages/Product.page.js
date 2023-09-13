import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import api from './../api/api';
import { calcAndFormatPrice } from './../utils/index';

import { Spinner } from '../components/layout';
import { AddToCartBtn, Message } from '../components';

const Product = ({ setCart, cart, user }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  const { productId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
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

    getProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${product.id}`);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
  };

  const handleEdit = async () => {
    navigate(`/products/${product.id}/edit`);
  };

  const price = product && calcAndFormatPrice(product.price);

  return (
    <>
      <Button onClick={() => navigate('/')} className='mb-3'>
        חזרה
      </Button>

      {loading ? (
        <Spinner />
      ) : error.isError ? (
        <Message variant='danger' dismissible={false}>
            {error.message}
        </Message>
      ) : (
        <>
          <Row>
                <Col md={12}>
                  <Image src={product.thumbnail} alt={product.name} fluid />
                </Col>
                <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                          <Col>שם:</Col>
                          <Col>
                            <strong>
                              {product.title}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                      <Col>מחיר:</Col>
                      <Col>
                        <strong
                              style={{ fontSize: price > 999 && '0.85rem' }}
                        >
                          {product.price}{' '}ש"ח
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>סטטוס:</Col>
                      <Col>
                            {product.stock > 0 ? `קיים במלאי` : `חסר במלאי`}
                      </Col>
                    </Row>
                      </ListGroup.Item>
                  <ListGroup.Item>
                        <AddToCartBtn
                          disabled={product.stock === 0}
                          cart={cart} setCart={setCart} id={product.id} />
                  </ListGroup.Item>
                      {user && (
                        <>
                      <ListGroup.Item>
                            <Button onClick={handleEdit}>ערוך מוצר</Button>
                      </ListGroup.Item>
                      <ListGroup.Item>
                            <Button variant="danger" onClick={handleDelete}>מחק מוצר</Button>
                      </ListGroup.Item>
                        </>)}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Product;
