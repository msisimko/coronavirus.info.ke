import React, { Component } from 'react';

import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  email: '',
  success: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = { ...INITIAL_STATE };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  onSubmit = event => {
    const { email } = this.state;
  
    this.props.firebase
      .doSendPasswordResetEmail(email)
      .then(() => {
        let success = { code: 200, message: "Please check your inbox for a password reset email." };
        this.setState({ success });
      })
      .catch(error => {
        this.setState({ error });
      });
  
    event.preventDefault();
  };
  
  render() {
    const { email, success, error } = this.state;

    const isInvalid = email === '';
  
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
          <button disabled={isInvalid} type="submit">Reset My Password</button>
        </form>

        {success && success.message}

        {error && error.message}
      </React.Fragment>
    );
  }
}
 
export default withFirebase(PasswordForgetForm);
