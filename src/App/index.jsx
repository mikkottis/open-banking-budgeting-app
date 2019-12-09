import React from 'react'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';

import Accounts from './Accounts';
import Budgets from './Budgets';
import Overview from './Overview';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = props => {
  return (
    <Container>
      <Row>
        <Col>
          <Tabs defaultActiveKey='accounts'>
            <Tab eventKey='overview' title='Overview'>
              <Overview />
            </Tab>
            <Tab eventKey='accounts' title='Accounts'>
              <Accounts />
            </Tab>
            <Tab eventKey='budgets' title='Budgets'>
              <Budgets />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App