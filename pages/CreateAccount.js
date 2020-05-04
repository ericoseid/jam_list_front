import React from 'react';
import styles from './CreateAccount.module.css';
const encode = require('querystring-browser');

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {errorMessage : undefined}

    this.onCreateAccount = this.onCreateAccount.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  validateInputs(username, email, password, passwordConfirm) {
    if (username === '') {
      this.setState({
        errorMessage : <p className={styles.error}>Please Enter a Username</p>
      });

      return false;
    } else if (email === '') {
      this.setState({
        errorMessage : <p className={styles.error}>Please Enter an email</p>
      });

      return false;
    } else if (password === '' || passwordConfirm === '') {
      this.setState({
        errorMessage : <p className={styles.error}>Please Enter and Confirm your Password</p>
      });

      return false;
    } else if (password != passwordConfirm) {
      this.setState({
        errorMessage : <p className={styles.error}>Passwords do not match</p>
      });

      return false;
    }

    return true;
  }

  async onCreateAccount() {
    this.setState(
      {errorMessage : undefined}
    );

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
        state : encode.stringify(queryState),
        scope : encode.escape('playlist-modify-public playlist-modify-private')
      };

      const paramString = encode.stringify(queryParams);

      window.location.replace(`https://accounts.spotify.com/authorize?${paramString}`);
    } else {
      if (response.status == 470) {
        this.setState({
          errorMessage : <p className={styles.error}>Username is Already Taken</p>
        });
      } else if (response.status == 471) {
        this.setState({
          errorMessage : <p className={styles.error}>Email is Already Taken</p>
        });
      } else {
        this.setState({
          errorMessage : <p className={styles.error}>Something went wrong, please try again in some time</p>
        });
      }
    } 
  }
  
  render() {
    return (
      <div className={styles.main}>
        <style global jsx>
          {`
            body {
              background-color : Aquamarine;
            }
           `}
        </style>
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
        {this.state.errorMessage}
        <br />
        <button className={styles.createAccount} onClick={this.onCreateAccount}>Create Account</button>
      </div>
    );
  }
}

export default CreateAccount;