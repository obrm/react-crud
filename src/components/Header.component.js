import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

import { removeItem } from './../services/localStorageService';

import logo from '../assets/images/logo.png';

const Header = ({ cart, user, setUser }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeItem('user');
    setUser(null);
  };

  return (
    <header>
      <Navbar bg='primary' className='navbar-dark' expand='lg' collapseOnSelect>
        <Container>
          <Link to='/'>
            <Navbar.Brand className='mr-n4'>
              <Navbar.Brand>
                <img src={logo} alt='logo' className='logo-img' />
              </Navbar.Brand>
            </Navbar.Brand>
          </Link>
          <Nav className='mr-auto'>
            {user && <NavLink
              to='/add'
              className={({ isActive }) => isActive ? 'is-active' : undefined}
            >
              הוספת מוצר
            </NavLink>}
            <NavLink
              to='/cart'
              className={({ isActive }) => isActive ? 'is-active' : undefined}
            >
              <i className='fas fa-shopping-cart'></i> עגלת קניות{' '}
              {cart.length > 0 &&
                `(${cart.reduce((acc, item) => acc + item.qty, 0)})`}
            </NavLink>
          {user ? (<Dropdown className='ml-auto'>
            <Dropdown.Toggle variant='success' id='dropdown-basic'>
              {user.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogOut}>התנתק</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>) : (
            <Dropdown className='ml-auto'>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                התחברות
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/login')}>התחבר</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
