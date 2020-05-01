import React from 'react';
import styles from './CreateAccount.module.css';
const encode = require('querystring');

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  validateInputs(username, email, password, passwordConfirm) {
    if (username === '') {
      document.getElementById('usernameNotPresentError').setAttribute('class', styles.error);

      return false;
    } else if (email === '') {
      document.getElementById('emailNotPresentError').setAttribute('class', styles.error);

      return false;
    } else if (password === '' || passwordConfirm === '') {
      document.getElementById('passwordNotPresentError').setAttribute('class', styles.error);

      return false;
    } else if (password != passwordConfirm) {
      document.getElementById('passwordMismatchError').setAttribute('class', styles.error);

      return false;
    }

    return true;
  }

  async onCreateAccount() {
    const username = document.getElementById('usernameId').value;
    const email = document.getElementById('emailId').value;
    const password = document.getElementById('passwordId').value; 
    const confirmPassword = document.getElementById('confirmPasswordId').value;

    if (!this.validateInputs(username, email, password, confirmPassword)) {
      return;
    }
    

    const request = {
      user_name : username,
      user_email : email,
      user_password : password
    }

    const response = await fetch('http://127.0.0.1:3005/users/create', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (response.ok) {
      const queryState = {
        user_name : username
      };

      const queryParams = {
        client_id : '90bb1e9b33d9402b887b698376c36715',
        response_type : 'code',
        redirect_uri :  'http://127.0.0.1:3000/CompleteAccount',
        state : encode.stringify(queryState)
      };

      const paramString = encode.stringify(queryParams);

      window.location.replace(`https://accounts.spotify.com/authorize?${paramString}`);
    } else {
      if (response.status == 470) {
        console.log(response.status);
        const errMessage = document.getElementById('existingUsernameError');

        errMessage.setAttribute('class', styles.error);
      } else if (response.status == 471) {
        const errMessage = document.getElementById('existingEmailError');

        errMessage.setAttribute('class', styles.error);
      } else {
        const errMessage = document.getElementById('internalError');

        errMessage.setAttribute('class', styles.error);
      }
    }
  }
  
  render() {
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>JamList</h1>
        <br />
        <label className={styles.labels} htmlFor='username'>Username</label> 
        <br />
        <input type='text' name='username' id='usernameId'/>
        <br />
        <label className={styles.labels} htmlFor='email'>Email</label> 
        <br />
        <input type='text' name='email' id='emailId'/>
        <br />
        <label className={styles.labels} htmlFor='password'>Password</label> 
        <br />
        <input type='password' name='password' id='passwordId'/>
        <br />
        <label className={styles.labels} htmlFor='confirmPassword'>Confirm Password</label> 
        <br />
        <input type='password' name='confirmPassword' id='confirmPasswordId'/>
        <br />
        <p id='existingUsernameError' className={styles.hiddenError}>Username is already taken</p>
        <p id='existingEmailError' className={styles.hiddenError}>Email is already taken</p>
        <p id='internalError' className={styles.hiddenError}>Something went wrong. Please try again in a moment</p>
        <p id='usernameNotPresentError' className={styles.hiddenError}>Please enter a username</p>
        <p id='emailNotPresentError' className={styles.hiddenError}>Please enter password</p>
        <p id='passwordNotPresentError' className={styles.hiddenError}>Please enter a password</p>
        <p id='passwordMismatchError' className={styles.hiddenError}>Passwords do not match</p>
        <button className={styles.createAccount} onClick={this.onCreateAccount}>Create Account</button>
      </div>
    );
  }
}

export default CreateAccount;