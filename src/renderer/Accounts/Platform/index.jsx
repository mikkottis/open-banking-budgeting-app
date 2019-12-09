import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Container } from 'react-bootstrap';

import LoadingButton from '../../components/LoadingButton';

const { authenticate, hasToken, unauthenticate } = window.require('electron').remote.require('./API/authenticate');

class Platform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: hasToken(props.name),
      isAuthenticating: false,
      isUnauthenticating: false
    }
  }

  onAuthenticate() {
    const { name } = this.props;

    this.setState({ isAuthenticating: true }, async () => {
      await authenticate(name);
      this.setState({
        isAuthenticated: true,
        isAuthenticating: false
      });
    });
  }

  onUnauthenticate() {
    const { name } = this.props;

    this.setState({ isUnauthenticating: true }, async () => {
      await unauthenticate(name);
      this.setState({
        isAuthenticated: false,
        isUnauthenticating: false
      });
    });
  }

  renderAccountSelection() {
    const { isUnauthenticating } = this.state;

    return (
      <LoadingButton
        title='Disconnect'
        loading={isUnauthenticating}
        onClick={() => this.onUnauthenticate()}
      />
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
    const { isAuthenticated } = this.state;

    return (
      <Card className='platformCard'>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          {isAuthenticated ? this.renderAccountSelection() : this.renderAuthenticateButton()}
        </Card.Body>
      </Card>
    );
  }
}

Container.propTypes = {
  name: PropTypes.string.isRequired
};

export default Platform
