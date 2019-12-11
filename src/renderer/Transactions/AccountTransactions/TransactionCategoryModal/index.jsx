import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

import LoadingButton from '../../../components/LoadingButton';

const { getBudgets } = window.require('electron').remote.require('./API/budgets');
const { createTransactionCategory } = window.require('electron').remote.require('./API/transactionCategories');

class TransactionCategoryModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);

    this.budgets = getBudgets();

    this.state = {
      isSaving: false,
      selectedBudgetId: Object.keys(this.budgets)[0]
    }
  }

  onSave() {
    const { transaction } = this.props;
    const { selectedBudgetId } = this.state;

    this.setState({ isCreating: true }, async () => {
      await createTransactionCategory(transaction.creditorId.id, selectedBudgetId);
      this.onClose();
    });
  }

  onClose() {
    const { handleClose } = this.props;

    this.setState({
      isCreating: false
    }, handleClose);
  }

  renderBudgetOptions() {
    return Object.keys(this.budgets).map(key => {
      return (
        <option key={key} value={key}>{this.budgets[key].name}</option>
      )
    }); 
  }

  render() {
    const { isVisible, transaction } = this.props;
    const { isSaving } = this.state;

    if (!transaction) return null;

    return (
      <Modal show={isVisible} onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set transaction category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Category</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as='select'
              onChange={(event) => this.setState({ selectedBudgetId: event.target.value })}
            >
              {this.renderBudgetOptions()}
            </FormControl>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.onClose}>
            Close
          </Button>
          <LoadingButton
            title='Save'
            loading={isSaving}
            onClick={this.onSave}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

TransactionCategoryModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  transaction: PropTypes.object
};

export default TransactionCategoryModal
