import React from 'react';
 
import { withFirebase } from '../../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChange extends React.Component {
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
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doUpdatePassword(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
 
    const isInvalid = passwordOne !== passwordTwo || 
                      passwordOne === '';
 
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="New Password" />
          <input name="passwordTwo" value={passwordTwo} onChange={this.onChange} type="password" placeholder="Confirm New Password" />
          <button disabled={isInvalid} type="submit">Reset My Password</button>
        </form>

        {error && error.message}
      </React.Fragment>
    );
  }
}
 
export default withFirebase(PasswordChange);
