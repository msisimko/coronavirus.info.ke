import React, { Component } from 'react';
 
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  email: '',
  success: null,
  error: null,
};

class EmailChange extends Component {
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
      .doUpdateEmail(email)
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        let success = { code: 200, message: "Your email has successfully been updated." };
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
          <input name="email" value={email} onChange={this.onChange} type="text" placeholder="New Email" />
          <button disabled={isInvalid} type="submit">Reset My Email</button>
        </form>

        {success && success.message}

        {error && error.message}
      </React.Fragment>
    );
  }
}
 
export default withFirebase(EmailChange);
