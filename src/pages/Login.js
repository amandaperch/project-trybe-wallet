import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <main>
        <div>
          <h1>Login</h1>
        </div>
        <form>
          <label htmlFor="email">
            Email
            <input
              type="text"
              data-testid="email-input"
              name="email"
            />
          </label>
          <label htmlFor="password">
            Email
            <input
              type="text"
              data-testid="password-input"
              name="password"
            />
          </label>
        </form>
      </main>
    );
  }
}

export default Login;
