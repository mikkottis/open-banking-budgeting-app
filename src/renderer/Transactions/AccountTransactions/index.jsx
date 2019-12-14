import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Table } from 'react-bootstrap';

import TransactionCategoryModal from './TransactionCategoryModal';

const { getTransactions } = window.require('electron').remote.require('./API/transactions');
const { getTransactionCategory } = window.require('electron').remote.require('./API/transactionCategories');
const { getBudget } = window.require('electron').remote.require('./API/budgets');

class AccountTransactions extends Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);

    this.state = {
      isModalVisible: false,
      transactions: getTransactions(props.accountId),
      selectedTransaction: null
    }
  }

  closeModal() {
    const { accountId } = this.props;

    this.setState({
      isModalVisible: false,
      budgets: getTransactions(accountId)
    });
  }

  renderCategoryButton(transaction) {
    const transactionCategory = getTransactionCategory(transaction.creditorId.id);
    const budget = getBudget(transactionCategory);
    const text = !budget ? 'Kategoriseerimata' : budget.name;

    return (
      <Button
        variant='primary'
        onClick={() => this.setState({
          isModalVisible: true,
          selectedTransaction: transaction
        })}
      >
        {text}
      </Button>
    );
  }

  renderTransactions() {
    const { transactions } = this.state;

    if (!transactions) {
      return 'Tehingud puuduvad.';
    }

    const rows = transactions.map(transaction => {  
      return (
        <tr key={transaction.id}>
          <td>{transaction.valueDate}</td>
          <td>{transaction.creditorName}</td>
          <td>{`${transaction.transactionAmount.amount} ${transaction.transactionAmount.currency}`}</td>
          <td className='tableActionColumn'>{this.renderCategoryButton(transaction)}</td>
        </tr>
      )
    });

    return (
      <Table>
        <thead>
          <tr>
            <th className='tableHeader'>Kuupäev</th>
            <th className='tableHeader'>Saaja</th>
            <th className='tableHeader'>Summa</th>
            <th className='tableHeader'></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }

  render() {
    const { accountName, accountIban } = this.props;
    const { isModalVisible, selectedTransaction } = this.state;

    return (
      <Card className='accountTransactionCard'>
        <Card.Body>
          <Card.Title>{`${accountName} - ${accountIban}`}</Card.Title>
          {this.renderTransactions()}
          <TransactionCategoryModal
            isVisible={isModalVisible}
            handleClose={this.closeModal}
            transaction={selectedTransaction}
          />
        </Card.Body>
      </Card>
    );
  }
}

AccountTransactions.propTypes = {
  accountName: PropTypes.string.isRequired,
  accountIban: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired
};

export default AccountTransactions
