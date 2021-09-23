import {
  ADD_TRANSACTION,
  LOADING_TRANSACTION,
  FETCH_TRANSACTION,
} from "../Actions/actionType";
import axios from "axios";
import { url } from "../../helpers/urlConfig";

export function fetchTransactions(data) {
  return {
    type: FETCH_TRANSACTION,
    payload: data,
  };
}

export function addTransactions(data) {
  return {
    type: ADD_TRANSACTION,
    payload: data,
  };
}

export function loadingTransactions(data) {
  return {
    type: LOADING_TRANSACTION,
    payload: data,
  };
}

export function insertTransaction(data) {
  return (dispatch) => {
    dispatch(loadingTransactions(true));

    axios
      .post(`${url}/insertTransaction`, data)
      .then((res) => {
        dispatch(loadingTransactions(false));
        dispatch(addTransactions(res.data));
      })

      .catch((err) => {
        alert(err);
      });
  };
}

export function fetchTransaction() {
  const ids = 2;
  return (dispatch) => {
    dispatch(loadingTransactions(true));
    axios
      .get(`${url}/getTransaction/${ids}`)
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        let nama = [];
        let quantity = [];
        let datas = []

        for (let i = 0; i < data.length; i++) {

          if([i] === 0){
            datas.push(data)
          }

          if (data[i].id === data[i - 1].id) {
            nama.push(data[i].nama);
          }
        }

        console.log(nama)

        // let nama = res.data.result.map((value) => {
        //   return value.nama;
        // });

        // let quantity = res.data.result.map((value) => {
        //   return value.quantity;
        // });

        let transaksi = {
          id: res.data.result[0].id,
          nama: nama,
          quantity: quantity,
          tanggal: res.data.result[0].tanggal,
          status: res.data.result[0].status,
          total: res.data.result[0].total,
        };
        dispatch(loadingTransactions(false));
        // dispatch(fetchTransactions(transaksi));
      })

      .catch((err) => {
        alert(err);
      });
  };
}
