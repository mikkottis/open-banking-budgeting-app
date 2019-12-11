import React from 'react'
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';

import Accounts from './Accounts';
import Budgets from './Budgets';
import Overview from './Overview';
import Transactions from './Transactions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = props => {
  return (
    <Container>
      <Row>
        <Col>
          <Tabs defaultActiveKey='transactions'>
            <Tab eventKey='overview' title='Overview'>
              <Overview />
            </Tab>
            <Tab eventKey='accounts' title='Accounts'>
              <Accounts />
            </Tab>
            <Tab eventKey='budgets' title='Budgets'>
              <Budgets />
            </Tab>
            <Tab eventKey='transactions' title='Transactions'>
              <Transactions />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App