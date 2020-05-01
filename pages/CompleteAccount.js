import React from 'react'

class CompleteAccount extends React.Component {
  async componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);

    const authCode = urlParams.get('code');
    const username = urlParams.get('state').split('=')[1];

    const request = {
      auth_code : authCode,
      user_name : username
    };

    let response = await fetch('http://127.0.0.1:3005/users/complete', {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    console.log(response.status);
  }

  render() {
    return (<p>This page should redirect momentarily...</p>);
  }
}

export default CompleteAccount;
