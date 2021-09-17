import axios from 'axios';

export function doLogin(params) {
  return async dispatch => {
    try {
      // console.log(params.email, params.password)
      dispatch({ type: 'LOGIN', payload: { isLoading: true } })
      const { data } = await axios.post(`http://localhost:5002/users/login`, params);
      // console.log(data.token)

      dispatch({
        type: 'LOGIN',
        payload: {
          ...data,
          isLogin: true,
          isLoading: false
        }
      })
      localStorage.setItem('access_token', data.token)
    } catch (err) {
      console.log(err)
    }
  }
}

export function doRegister(data) {
  return (dispatch) => {
    axios.post(`http://localhost:5002/users/register`, data)
      .then(res => {
        console.log("register:", res)
        dispatch({
          type: 'LOGIN',
          payload: {
            ...res.data,
            isLogin: true,
          }
        })
      })
      .catch(err => console.log(err));
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