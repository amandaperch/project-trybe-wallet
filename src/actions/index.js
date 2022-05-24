// Coloque aqui suas actions
export const actionLogin = (name) => ({
  type: 'EMAIL',
  payload: name,
});

const actionCurrencies = (currencies) => ({
  type: 'CURRENCIES',
  payload: currencies,
});

const actionExpense = (expense) => ({
  type: 'EXPENSE',
  payload: expense,
});

// Chamada API

export const apiEconomia = () => async (dispatch) => {
  const callApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const economiaData = await callApi.json();
  const filterApiEconomia = Object.keys(economiaData)
    .filter((currency) => currency !== 'USDT');
  dispatch(actionCurrencies(filterApiEconomia));
};

export const apiEconomiaExpense = (wallet) => async (dispatch) => {
  const callApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const economiaData = await callApi.json();
  const payload = { ...wallet, exchangeRates: { ...economiaData } };
  dispatch(actionExpense(payload));
};
