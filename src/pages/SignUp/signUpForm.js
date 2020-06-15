import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

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

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // set up roles
    const roles = {};

    // some examples of roles
    roles[ROLES.CONTRIBUTOR] = ROLES.CONTRIBUTOR;
    // roles[ROLES.EDITOR] = ROLES.EDITOR;
    // roles[ROLES.ADMINISTRATOR] = ROLES.ADMINISTRATOR;

    this.setState({ roles });
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { displayName, email, passwordOne, roles } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // create a user in Firestore
        return this.props.firebase 
          .user(authUser.user.uid)
          .set({
            displayName,
            email,
            roles,
          });
      })
      .then(() => {
        // update user profile with displayName
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

  render() {
    const { displayName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo ||
                      passwordOne === '' ||
                      email === '' ||
                      displayName === '';

    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="displayName" value={displayName} onChange={this.onChange} type="text" placeholder="Display Name" />
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
          <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password" />
          <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm Password" />
          <button disabled={isInvalid} type="submit">Sign Up</button>
        </form>
        
        {error && error.message}
      </React.Fragment>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
