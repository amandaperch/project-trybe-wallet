import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { apiEconomia, apiEconomiaExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { addCurrencies } = this.props;
    addCurrencies();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  submit = (event) => {
    const { expenseAdd, expenses } = this.props;
    event.preventDefault();
    const id = expenses.length;
    const idPlusExpense = { id, ...this.state };
    expenseAdd(idPlusExpense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  sum = () => {
    const { expenses } = this.props;
    if (expenses.length === 0) return 0;
    const total = expenses
      .map(({ value, currency, exchangeRates }) => (
        Number(value) * Number(exchangeRates[currency].ask)
      ))
      .reduce((accumulator, curr) => accumulator + curr);
    return total.toFixed(2);
  };

  ask = (expense) => Number(expense.exchangeRates[expense.currency].ask);

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <h3 data-testid="email-field">
            {email}
          </h3>
          <h3 data-testid="total-field">
            { this.sum() }
          </h3>
          <h3 data-testid="header-currency-field">
            BRL
          </h3>
        </header>
        <form>
          <label htmlFor="valor">
            Valor
            <input
              id="value"
              name="value"
              type="text"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              id="description"
              name="description"
              type="text"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
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
            Método de Pagamento:
            <select
              id="method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag_input">
            Categoria:
            <select
              id="tag_input"
              data-testid="tag-input"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="submit" onClick={ this.submit }>
            Adicionar despesa
          </button>
        </form>
        <form>
          <table>
            <tr>
              <th>
                Descrição
              </th>
              <th>
                Tag
              </th>
              <th>
                Método de pagamento
              </th>
              <th>
                Valor
              </th>
              <th>
                Moeda
              </th>
              <th>
                Câmbio utilizado
              </th>
              <th>
                Valor convertido
              </th>
              <th>
                Moeda de conversão
              </th>
              <th>
                Editar/Excluir
              </th>
            </tr>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ this.ask(expense).toFixed(2) }</td>
                <td>{ (this.ask(expense) * Number(expense.value)).toFixed(2)}</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td> Real </td>
                <td><button type="button">Adicionar</button></td>
                <td><button data-testid="delete-btn" type="button">Excluir</button></td>
              </tr>
            ))}
          </table>
        </form>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addCurrencies: () => {
    dispatch(apiEconomia());
  },
  expenseAdd: (state) => {
    dispatch(apiEconomiaExpense(state));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  expenseAdd: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};
