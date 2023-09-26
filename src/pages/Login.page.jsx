import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import useForm from '../hooks/useForm';
import { setItem } from '../services/localStorageService';

import { Message } from '../components';

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    password: ''
  };

  const {
    formData,
    error,
    setError,
    handleChange,
  } = useForm(initialFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setError({
        isError: true,
        message: 'אנא מלאו את כל הפרטים'
      });
    } else {
      const user = { email: formData.email, name: 'John Doe' };
      setItem('user', user);
      setUser(user);
      navigate('/');
    }
  };

  return (
    <>
      <Button onClick={() => navigate('/')} className='mb-3 mt-3'>
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

            <Button variant='primary' type='submit' className='mt-3'>
              התחבר
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
