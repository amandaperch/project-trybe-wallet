// Esse reducer será responsável por tratar as informações da pessoa usuária
const USER_STATE = {
  email: '',
};

const user = (state = USER_STATE, action) => {
  switch (action.type) {
  case 'EMAIL':
    return { ...state, email: action.payload };
  default:
    return state;
  }
};

export default user;
