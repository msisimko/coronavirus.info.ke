import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  roles: {},
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const roles = {};
    
    roles[ROLES.CONTRIBUTOR] = ROLES.CONTRIBUTOR;

    this.setState({ roles });
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = event => {
    const { displayName, email, passwordOne, roles } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase 
                .user(authUser.user.uid)
                .set({ roles });
      })
      .then(() => {
        return this.props.firebase.auth.currentUser
                .updateProfile({
                  displayName,
                });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { displayName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = displayName === '' ||
                      email === '' ||
                      passwordOne !== passwordTwo ||
                      passwordOne === '';

    const isError = error !== null;

    const isDisabled = isInvalid || isError;

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="displayName" value={displayName} onChange={this.onChange} type="text" placeholder="Display Name" />
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
          <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
          <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
          <button disabled={isDisabled} type="submit">Sign Up</button>
        </form>

        {error &&
          <Snackbar open={isError} autoHideDuration={6000} onClose={this.handleClose}>
            <Alert elevation={6} variant="filled" onClose={this.handleClose} severity="error">
              {error.message}
            </Alert>
          </Snackbar>
        }
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
