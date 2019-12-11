import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';

import LoadingButton from '../../components/LoadingButton';
import './styles.css';

const { createBudget } = window.require('electron').remote.require('./API/budgets');

class ConsentModal extends Component {
  constructor(props) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onCreate = this.onCreate.bind(this);

    this.state = {
      isCreating: false,
      name: '',
      amount: 0
    }
  }

  onCreate() {
    const { name, amount } = this.state;

    this.setState({ isCreating: true }, async () => {
      await createBudget({ name, amount });
      this.onClose();
    });
  }

  onClose() {
    const { handleClose } = this.props;

    this.setState({
      isCreating: false
    }, handleClose);
  }

  render() {
    const { isVisible } = this.props;
    const { isCreating } = this.state;

    return (
      <Modal show={isVisible} onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new budget category</Modal.Title>
        </Modal.Header>
        <Modal.Body className='budgetModalBody'>
          <FormControl
            placeholder='Category name'
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>€</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='number'
              placeholder='Amount'
              onChange={(event) => this.setState({ amount: event.target.value })}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.onClose}>
            Close
          </Button>
          <LoadingButton
            title='Add'
            loading={isCreating}
            onClick={this.onCreate}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

ConsentModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ConsentModal
