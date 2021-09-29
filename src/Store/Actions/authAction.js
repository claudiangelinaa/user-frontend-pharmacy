import axios from "axios";
import { url } from "../../helpers/urlConfig";

// export function doLogin(params) {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "LOGIN", payload: { isLoading: true } });
//       const { data } = await axios.post(
//         `${url}/users/login`,
//         params
//       );

//       dispatch({
//         type: "LOGIN",
//         payload: {
//           ...data,
//           isLogin: true,
//           isLoading: false,
//         },
//       });
//       console.log("data", data)
//       localStorage.setItem("access_token", data.token);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

export function doLogin(data) {
  return async (dispatch) => {
    // console.log(data)
    dispatch({
      type: "LOGIN",
      payload: {
        ...data,
        isLogin: true,
        isLoading: false,
      },
    });
  };
}

// export function doRegister(data) {
//   return (dispatch) => {
//     axios
//       .post(`${url}/users/register`, data)
//       .then((res) => {
//         console.log("register:", res);
//         dispatch({
//           type: "LOGIN",
//           payload: {
//             ...res.data,
//             isLogin: true,
//           },
//         });
//       })
//       .catch((err) => console.log(err));
//     dispatch({
//       type: 'LOGIN',
//       payload: {
//         ...data,
//         isLogin: true,
//       }
//     })
//   }
// }

export function doLogout() {
  return async (dispatch) => {
    await localStorage.removeItem("access_token");
    dispatch({
      type: "LOGOUT",
    });
  };
}

// export function checkLogin() {
//   return async dispatch => {
//     const userId = await localStorage.getItem('userId');
//     console.log("[checkLogin] userId:", userId);
//     if (userId) {
//       const { data } = await axios.get(`${url}/users?id=${userId}`);
//       // console.log("[checkLogin] data:", data);
//       dispatch({
//         type: 'LOGIN',
//         payload: { ...data[0], isLogin: true, isLoading: false }
//       });
//     };
//   };
// }

export function checkLogin() {
  return async (dispatch) => {
    const token = await localStorage.getItem("access_token");
    // console.log("[checkLogin] token:", token);
    if (token) {
      const { data } = await axios.get(`${url}/users/check-token`, {
        headers: { Authorization: token },
      });
      // console.log("[checkLogin] data:", data);
      dispatch({
        type: "LOGIN",
        payload: { ...data, isLogin: true, isLoading: false },
      });
    }
  };
}
