import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import Platform from './Platform';
import './styles.css';

class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
            <Card className='accountsCard'>
              <Card.Header>Accounts</Card.Header>
              <Card.Body>
                <Card.Title>Manage your linked accounts</Card.Title>
                <Platform className='test' name='Swedbank' />
                <Platform name='SEB' />
                <Platform name='Luminor' />
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
}

export default Accounts