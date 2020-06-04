import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
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
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  render() {
    const { email, password, error } = this.state;
    
    const isInvalid = password === '' ||
                      email === '';
 
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
          <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
          <button disabled={isInvalid} type="submit">Sign In</button>
        </form>
          
        {error && error.message}
      </React.Fragment>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInForm;
