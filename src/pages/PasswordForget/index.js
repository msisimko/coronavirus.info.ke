import React from 'react';

import PasswordForgetForm from './passwordForgetForm';
import PasswordForgetLink from './passwordForgetLink';

class PasswordForget extends React.Component {
  render() {
    return(
      <React.Fragment>
        <h1>Password Forget</h1>
        <PasswordForgetForm />
      </React.Fragment>
    )
  }
}
 
export default PasswordForget;

export { PasswordForgetForm, PasswordForgetLink };
