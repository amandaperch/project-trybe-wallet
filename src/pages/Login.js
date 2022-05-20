import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import login from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (event) => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    event.preventDefault();
    dispatch(login(email));
    history.push('/carteira');
  }

  validationEmail = (email) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailReg.test(email);
  }

  validationPassoword = (password) => {
    const maxLength = 6;
    return password.length >= maxLength;
  }

  render() {
    const { email, password } = this.state;
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
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              type="text"
              data-testid="password-input"
              name="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSubmit }
            disabled={ !this.validationEmail(email)
              || !this.validationPassoword(password) }
          >
            Entrar
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.arrayOf.isRequired,
};

export default connect()(Login);
