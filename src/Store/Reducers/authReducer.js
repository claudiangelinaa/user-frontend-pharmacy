const initialState = {
    id: '',
    email: '',
    isLogin: false,
  }
  
  export default function authReducer(state = initialState, action) {
    switch(action.type) {
      case 'LOGIN':
        return {
          ...state,
          id: action.payload.id,
          email: action.payload.email,
          isLogin: action.payload.isLogin,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  }