import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import api from './../api/api';

import { Spinner } from '../components/layout';
import { Message } from '../components';

const EditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    isError: false,
    message: ''
  });
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    thumbnail: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setFormData({
          title: response.data.title,
          price: response.data.price,
          stock: response.data.stock,
          thumbnail: response.data.thumbnail,
          description: response.data.description
        });
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    navigate(`/products/${product.id}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/products/${productId}`, formData);
      navigate(`/products/${productId}`);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        message: error.response.data.message
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error.isError) {
    return (
      <Message variant='danger' dismissible={false}>
        {error.message}
      </Message>
    );
  }

  return (
    <>
      <Button onClick={() => navigate(`/products/${product.id}`)} className='mb-3'>
        חזרה
      </Button>

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formName'>
              <Form.Label>שם המוצר:</Form.Label>
              <Form.Control
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formPrice'>
              <Form.Label>מחיר:</Form.Label>
              <Form.Control
                type='number'
                name='price'
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formStock'>
              <Form.Label>מלאי:</Form.Label>
              <Form.Control
                type='number'
                name='stock'
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formThumbnail'>
              <Form.Label>תמונה:</Form.Label>
              <Form.Control
                type='text'
                name='thumbnail'
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='formDescription'>
              <Form.Label>תיאור:</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                name='description'
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant='secondary' onClick={handleCancel} className='mr-2'>
              בטל
            </Button>
            <Button variant='primary' type='submit'>
              שמור שינויים
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EditProduct;
