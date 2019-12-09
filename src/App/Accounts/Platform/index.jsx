import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

class Platform extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name } = this.props;

    return (
      <Card className='platformCard'>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Add account</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

Container.propTypes = {
  name: PropTypes.string.isRequired
};

export default Platform