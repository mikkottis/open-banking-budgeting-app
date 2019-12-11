import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table } from 'react-bootstrap';

import LoadingButton from '../../../components/LoadingButton';

const { getAccounts } = window.require('electron').remote.require('./API/accounts');
const { createConsent } = window.require('electron').remote.require('./API/consents');

class ConsentModal extends Component {
  constructor(props) {
    super(props);

    this.onSync = this.onSync.bind(this);
    this.onClose = this.onClose.bind(this);

    this.state = {
      isSaving: false,
      selectedAccounts: new Set(),
      accounts: getAccounts(props.name)
    }
  }

  addSelectedAccount(resourceId) {
    const { selectedAccounts } = this.state;

    this.setState({
      selectedAccounts: new Set([...selectedAccounts, resourceId])
    });
  }

  removeSelectedAccount(resourceId) {
    const { selectedAccounts } = this.state;

    const newSelectedAccounts = new Set([...selectedAccounts]);
    newSelectedAccounts.delete(resourceId);
    this.setState({
      selectedAccounts: newSelectedAccounts
    })
  }

  onSelectAccount(event, resourceId) {
    event.target.checked ? this.addSelectedAccount(resourceId) : this.removeSelectedAccount(resourceId);
  }

  onSync() {
    const { name } = this.props;
    const { selectedAccounts } = this.state;

    this.setState({ isSaving: true }, async () => {
      await createConsent(name, [...selectedAccounts]);
      this.onClose();
    });
  }

  onClose() {
    const { handleClose } = this.props;

    this.setState({
      isSaving: false,
      selectedAccounts: new Set()
    }, handleClose);
  }

  renderAccounts() {
    const { accounts } = this.state;

    const rows = accounts.map(account => {
      return (
        <tr key={account.resourceId}>
          <td><input type='checkbox' onChange={(event) => this.onSelectAccount(event, account.resourceId)}/></td>
          <td>{account.name}</td>
          <td>{account.iban}</td>
        </tr>
      )
    });

    return (
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Account name</th>
            <th>IBAN</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    );
  }

  render() {
    const { isVisible } = this.props;
    const { isSaving } = this.state;

    return (
      <Modal show={isVisible} onHide={this.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose which accounts to sync</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderAccounts()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this.onClose}>
            Close
          </Button>
          <LoadingButton
            title='Sync'
            loading={isSaving}
            onClick={this.onSync}
          />
        </Modal.Footer>
      </Modal>
    );
  }
}

ConsentModal.propTypes = {
  name: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default ConsentModal
