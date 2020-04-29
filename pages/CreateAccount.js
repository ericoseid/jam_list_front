import React from 'react';
import styles from './CreateAccount.module.css';

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.onCreateAccount = this.onCreateAccount.bind(this);
  }

  async onCreateAccount() {
    const username = document.getElementById('usernameId').value;
    const email = document.getElementById('emailId').value;
    const password = document.getElementById('passwordId').value; 

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
      body: JSON.stringify({})
    });

    const responseBody = await response.json();
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
        <input type='password' name='confirmPassword'/>
        <br />
        <button className={styles.createAccount} onClick={this.onCreateAccount}>Create Account</button>
      </div>
    );
  }
}

export default CreateAccount;