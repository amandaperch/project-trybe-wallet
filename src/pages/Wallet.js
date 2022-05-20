import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiEconomia } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { setApiEconomia } = this.props;
    setApiEconomia();
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h3 data-testid="email-field">
          {email}
        </h3>
        <h3 data-testid="total-field">
          0
        </h3>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  setApiEconomia: () => {
    dispatch(apiEconomia());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  setApiEconomia: PropTypes.func.isRequired,
};
