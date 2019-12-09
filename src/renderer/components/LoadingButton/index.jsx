import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

import './styles.css';

const LoadingButton = (props) => {
  const { title, loading, onClick } = props;

  return (
    <Button
      className='loadingBtn'
      disabled={loading}
      onClick={onClick}
    >
      {loading && (
        <Spinner className='loadingBtnSpinner' as="span" animation='border' size='sm' />
      )}
      <span>{title}</span>
    </Button>
  )
}

LoadingButton.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default LoadingButton