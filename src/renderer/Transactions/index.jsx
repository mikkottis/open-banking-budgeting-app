import React, { Component } from 'react';
import { Card, Container, Row } from 'react-bootstrap';

import AccountTransactions from './AccountTransactions';
import './styles.css';

const { getAccount } = window.require('electron').remote.require('./API/accounts');
const { getConsent } = window.require('electron').remote.require('./API/consents');

class Transactions extends Component {
  renderAccountTransactions(platformName) {
    const consent = getConsent(platformName);

    if (!consent) return [];

    return consent.transactions.map(transactionConsent => {
      const account = getAccount(platformName, transactionConsent.resourceId);
      
      return (
        <AccountTransactions
          key={account.resourceId}
          accountName={account.name}
          accountIban={account.iban}
          accountId={account.resourceId}
        />
      );
    });
  }

  render() {
    return (
      <Container>
        <Row>
            <Card className='tabCard'>
              <Card.Header>Tehingud</Card.Header>
              <Card.Body>
                <Card.Title>Kategoriseeri oma tehingud</Card.Title>
                {this.renderAccountTransactions('swedbank')}
                {this.renderAccountTransactions('seb')}
                {this.renderAccountTransactions('luminor')}
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
}

export default Transactions