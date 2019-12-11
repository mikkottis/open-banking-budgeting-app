import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Table } from 'react-bootstrap';

import ConsentModal from './ConsentModal';
import LoadingButton from '../../components/LoadingButton';

const { authenticate, hasToken, unauthenticate } = window.require('electron').remote.require('./API/authentication');
const { getAccount } = window.require('electron').remote.require('./API/accounts');
const { getConsent } = window.require('electron').remote.require('./API/consents');

class Platform extends Component {
  constructor(props) {
    super(props);

    this.closeConsentModal = this.closeConsentModal.bind(this);

    this.state = {
      isAuthenticated: hasToken(props.name),
      isAuthenticating: false,
      isUnauthenticating: false,
      isConsentModalVisible: false,
      connectedAccounts: this.getConnectedAccounts()
    }
  }

  getConnectedAccounts() {
    const { name } = this.props;

    const consent = getConsent(name);

    if (!consent) return [];

    return consent.accounts.map(account => getAccount(name, account.resourceId));
  }

  onAuthenticate() {
    const { name } = this.props;

    this.setState({ isAuthenticating: true }, async () => {
      await authenticate(name);
      this.setState({
        isAuthenticated: true,
        isAuthenticating: false,
        isConsentModalVisible: true
      });
    });
  }

  onUnauthenticate() {
    const { name } = this.props;

    this.setState({ isUnauthenticating: true }, async () => {
      await unauthenticate(name);
      this.setState({
        isAuthenticated: false,
        isUnauthenticating: false,
        connectedAccounts: []
      });
    });
  }

  closeConsentModal() {
    this.setState({
      isConsentModalVisible: false,
      connectedAccounts: this.getConnectedAccounts()
    });
  }

  renderAccountSelection() {
    const { connectedAccounts, isUnauthenticating } = this.state;

    const rows = connectedAccounts.map(account => {
      return (
        <tr key={account.resourceId}>
          <td>{account.name}</td>
          <td>{account.iban}</td>
        </tr>
      )
    });

    return (
      <React.Fragment>
        {connectedAccounts.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Account name</th>
                <th>IBAN</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
          )}
        <LoadingButton
          title='Disconnect'
          loading={isUnauthenticating}
          onClick={() => this.onUnauthenticate()}
        />
      </React.Fragment>
    )
  }

  renderAuthenticateButton() {
    const { isAuthenticating } = this.state;

    return (
      <LoadingButton
        title='Authenticate'
        loading={isAuthenticating}
        onClick={() => this.onAuthenticate()}
      />
    )
  }

  render() {
    const { name } = this.props;
    const { isAuthenticated, isConsentModalVisible } = this.state;

    return (
      <Card className='platformCard'>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          {isAuthenticated ? this.renderAccountSelection() : this.renderAuthenticateButton()}
          <ConsentModal
            name={name}
            isVisible={isConsentModalVisible}
            handleClose={this.closeConsentModal}
          />
        </Card.Body>
      </Card>
    );
  }
}

Container.propTypes = {
  name: PropTypes.string.isRequired
};

export default Platform
