import React, { Component } from 'react';
import { Card, Container, Row } from 'react-bootstrap';

import Platform from './Platform';
import './styles.css';

class Accounts extends Component {
  render() {
    return (
      <Container>
        <Row>
            <Card className='tabCard'>
              <Card.Header>Accounts</Card.Header>
              <Card.Body>
                <Card.Title>Manage your linked accounts</Card.Title>
                <Platform name='Swedbank' />
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