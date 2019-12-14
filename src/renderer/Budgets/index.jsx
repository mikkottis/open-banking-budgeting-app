import React, { Component } from 'react';
import { Button, Card, Container, Row, Table } from 'react-bootstrap';

import BudgetModal from './BudgetModal';
import './styles.css';

const { deleteBudget, getBudgets } = window.require('electron').remote.require('./API/budgets');

class Budgets extends Component {
  constructor(props) {
    super(props);

    this.closeBudgetModal = this.closeBudgetModal.bind(this);

    this.state = {
      isBudgetModalVisible: false,
      budgets: getBudgets()
    }
  }

  closeBudgetModal() {
    this.setState({
      isBudgetModalVisible: false,
      budgets: getBudgets()
    });
  }

  onDeleteBudget(key) {
    deleteBudget(key);
    this.setState({
      budgets: getBudgets()
    });
  }

  calculateTotalBudget() {
    const { budgets } = this.state;

    if (!budgets) {
      return 0;
    }

    return Object.keys(budgets).reduce((sum, key) => sum + Number(budgets[key].amount), 0);
  }

  renderBudgetsTable() {
    const { budgets } = this.state;

    if (!budgets) {
      return 'No budgets';
    }

    const rows = Object.keys(budgets).map(key => {
      const budget = budgets[key];
      return (
        <tr key={key}>
          <td>{budget.name}</td>
          <td>{budget.amount}</td>
          <td className='tableActionColumn'><Button variant='danger' onClick={() => this.onDeleteBudget(key)}>Kustuta</Button></td>
        </tr>
      )
    });

    return (
      <Table>
        <thead>
          <tr>
            <th className='tableHeader'>Nimi</th>
            <th className='tableHeader'>Summa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr className='budgetTotalRow'>
            <td><b>Kokku</b></td>
            <td><b>{this.calculateTotalBudget()}</b></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    );
  }

  render() {
    const { isBudgetModalVisible } = this.state;

    return (
      <Container>
        <Row>
            <Card className='tabCard'>
              <Card.Header>Eelarved</Card.Header>
              <Card.Body>
                <Card.Title>Halda oma eelarveid</Card.Title>
                {this.renderBudgetsTable()}
                <Button onClick={() => this.setState({ isBudgetModalVisible: true })}>Lisa eelarve</Button>
                <BudgetModal
                  isVisible={isBudgetModalVisible}
                  handleClose={this.closeBudgetModal}
                />
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
}

export default Budgets