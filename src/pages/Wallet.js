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
    const { email, currencies } = this.props;
    return (
      <>
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
        <form>
          <label htmlFor="valor">
            Valor
            <input
              type="number"
              data-testid="value-input"
              name="valor"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              data-testid="description-input"
              name="description"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
            >
              { currencies.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  { coin }
                </option>))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select id="method" data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag_input">
            Categoria:
            <select id="tag_input" data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
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
  currencies: PropTypes.arrayOf.isRequired,
};
