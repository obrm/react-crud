import { useState } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children, classN, dismissible }) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert
        variant={variant}
        className={classN}
        onClose={() => setShow(false)}
        dismissible={dismissible}
      >
        {children}
      </Alert>
    );
  }
  return <></>;
};

export default Message;
