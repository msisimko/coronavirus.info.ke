import React from 'react';

import AuthUserContext from './context';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { withFirebase } from '../firebase';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false, error: null };
  
      this.onSendEmailVerification = this.onSendEmailVerification.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
        .catch(error => {
          this.setState({ error });
        });
    }

    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      this.setState({ error: null });
    }

    render() {
      const { isSent, error } = this.state;

      const isError = error !== null;

      return(
        <AuthUserContext.Consumer>
          {authUser => 
            needsEmailVerification(authUser) ? (
              <React.Fragment>
                <div>
                  {isSent ? (
                    <p>E-Mail confirmation sent: Check you E-Mails (Spam folder included) for a confirmation E-Mail. Refresh this page once you confirm your E-Mail.</p>
                    ) : (
                    <p>Verify your E-Mail: Check you E-Mails (Spam folder included) for a confirmation E-Mail or send another confirmation E-Mail.</p>
                  )}

                  {error &&
                    <Snackbar open={isError} autoHideDuration={6000} onClose={this.handleClose}>
                      <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
                        {error.message}
                      </Alert>
                    </Snackbar>
                  }

                  <button type="button" onClick={this.onSendEmailVerification} disabled={isSent}>Send confirmation E-Mail</button>
                </div>
              </React.Fragment>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
}

export default withEmailVerification;
