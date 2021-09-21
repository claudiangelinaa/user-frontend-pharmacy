import axios from 'axios';

export function doLogin(data) {
  return async dispatch => {
    // console.log(data)
    dispatch({
      type: 'LOGIN',
      payload: {
        ...data,
        isLogin: true,
        isLoading: false
      }
    })
  }
}

export function doRegister(data) {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN',
      payload: {
        ...data,
        isLogin: true,
      }
    })
  }
}

export function doLogout() {
  return async (dispatch) => {
    await localStorage.removeItem('access_token')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export function checkLogin() {
  return async dispatch => {
    const token = await localStorage.getItem('access_token');
    console.log("[checkLogin] token:", token);
    if (token) {
      const { data } = await axios.get(`http://localhost:5002/users/check-token`, {headers : { "Authorization" : token }});
      console.log("[checkLogin] data:", data);
      dispatch({
        type: 'LOGIN',
        payload: { ...data, isLogin: true, isLoading: false }
      });
    };
  };
}