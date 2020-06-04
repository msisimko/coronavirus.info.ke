import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { displayName, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
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
