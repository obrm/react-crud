import spinner from '../../assets/images/spinner.gif';

const Spinner = () => (
  <>
    <img
      src={spinner}
      style={{ width: '125px', margin: 'auto', marginTop: '100px', display: 'block' }}
      alt='Loading...'
    />
  </>
);

export default Spinner;
