import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import { Message } from '../components';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    isError: false,
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError({
        isError: true,
        message: 'אנא מלאו את כל הפרטים'
      });
    } else {
      const user = { email: formData.email, name: 'John Doe' };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      navigate('/');
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/')} className='mb-3'>
        חזרה
      </Button>

      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formEmail'>
              <Form.Label>דואר אלקטרוני:</Form.Label>
              <Form.Control
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='formPassword'>
              <Form.Label>סיסמה:</Form.Label>
              <Form.Control
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            {error.isError && (
              <Message variant='danger' dismissible={false}>
                {error.message}
              </Message>
            )}

            <Button variant='primary' type='submit'>
              התחבר
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
