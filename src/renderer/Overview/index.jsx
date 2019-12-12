import React, { Component } from 'react';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';

import './styles.css';

const { getBudgets } = window.require('electron').remote.require('./API/budgets');
const { getAccount } = window.require('electron').remote.require('./API/accounts');
const { getConsent } = window.require('electron').remote.require('./API/consents');
const { getTransactions } = window.require('electron').remote.require('./API/transactions');
const { getTransactionCategory } = window.require('electron').remote.require('./API/transactionCategories');

class Overview extends Component {
  getAllTransactions() {
    const platforms = ['swedbank', 'seb', 'luminor'];
    const transactions = [];

    platforms.forEach(platform => {
      const consent = getConsent(platform);

      if (!consent) return;

      consent.transactions.forEach(transactionConsent => {
        const account = getAccount(platform, transactionConsent.resourceId);
        const accountTransactions = getTransactions(account.resourceId);

        accountTransactions.forEach(accountTransaction => transactions.push(accountTransaction));
      });
    });

    return transactions;
  }

  calculateBudgets() {
    const transactions = this.getAllTransactions();
    const transactionsByBudget = {};

    transactions.forEach(transaction => {
      const transactionCategory = getTransactionCategory(transaction.creditorId.id);

      if (!transactionCategory) {
        if (!transactionsByBudget['Uncategorized']) {
          transactionsByBudget['Uncategorized'] = 0;
        }
        transactionsByBudget['Uncategorized'] += Number(transaction.transactionAmount.amount);
        return;
      }

      if (!transactionsByBudget[transactionCategory]) {
        transactionsByBudget[transactionCategory] = 0;
      }
      transactionsByBudget[transactionCategory] += Number(transaction.transactionAmount.amount);
    });

    return transactionsByBudget;
  }

  renderOverviewRows() {
    const transactionsByBudget = this.calculateBudgets();
    const budgets = getBudgets();

    if (Object.keys(budgets).length === 0) {
      return 'No budgets to track';
    }

    const rows = Object.keys(transactionsByBudget).map(budgetId => {
      const budgetExpenses = transactionsByBudget[budgetId];
      const budget = budgets[budgetId];

      if (!budget) {
        return (
          <tr key='uncategorized'>
            <td>Uncategorized</td>
            <td>N/A</td>
            <td>{budgetExpenses}</td>
            <td>{0 - budgetExpenses}</td>
          </tr>
        );
      }

      return (
        <tr key={budgetId}>
          <td>{budget.name}</td>
          <td>{budget.amount}</td>
          <td>{budgetExpenses}</td>
          <td>{budget.amount - budgetExpenses}</td>
        </tr>
      );
    });

    return rows;
  }

  renderOverviewTable() {
    return (
      <Table>
        <thead>
          <tr>
            <th className='tableHeader'>Category</th>
            <th className='tableHeader'>Budgeted</th>
            <th className='tableHeader'>Spent</th>
            <th className='tableHeader'>Balance</th>
          </tr>
        </thead>
        <tbody>
          {this.renderOverviewRows()}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <Container>
        <Row>
            <Card className='tabCard'>
              <Card.Header>Overview</Card.Header>
              <Card.Body>
                {this.renderOverviewTable()}
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
}

export default Overview