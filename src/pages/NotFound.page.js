const NotFound = () => {
  return (
    <>
      <div style={{ height: '200px' }}></div>
      <div className='text-center'>
        <h1 className='x-large text-brand'>
          <i
            className='fas fa-exclamation-triangle'
            style={{ color: '#53dbb2' }}
          ></i>{' '}
          הדף לא נמצא
        </h1>
        <p className='large'>מצטערים, דף זה אינו קיים <br /> או שאין לך הרשאה לגשת אל הדף.</p>
      </div>
    </>
  );
};

export default NotFound;
