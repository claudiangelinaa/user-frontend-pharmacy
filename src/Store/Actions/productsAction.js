import axios from 'axios';

export function doInitProducts() {
  return dispatch => {
    axios.get(`http://localhost:5002/obatjadi`)
      .then(res => {
        dispatch({
          type: 'INIT_PRODUCTS',
          payload: res.data.result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
