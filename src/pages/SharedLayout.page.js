import { Outlet } from 'react-router-dom';

import { Header } from './../components';

const SharedLayout = ({ cart, user, setUser }) => {
  return (
    <>
      <Header cart={cart} user={user} setUser={setUser} />
      <Outlet />
    </>
  );
};

export default SharedLayout;