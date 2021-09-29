import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../Components/TableComponent";
import { fetchTransaction } from "../Store/Actions/transactionAction";
import LoadingComponent from "../Components/LoadingComponent";
import { convertToRupiah } from "../helpers/convertToRupiah";
import "../Styles/History.css";
import axios from "axios";
import { url } from "../helpers/urlConfig";

export default function RacikHistory() {
  const dispatch = useDispatch();
  const [transactionList, setTransactionList] = useState([]);
  const auth = useSelector((state) => state.authReducer);
  const { historyTransaction, isLoading } = useSelector(
    (state) => state.transactionReducer
  );

  useEffect(() => {
    dispatch(fetchTransaction());
    axios
      .get(`${url}/getRacikTransaction/${auth.id}`)
      .then((res) => {
        setTransactionList(res.data.data);
        console.log("getRacik:", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="History">
      <h2>Racik History Transaction</h2>
      <div className="TableHistory">
        {transactionList.map((val) => {
          return (
            <TableComponent
              id={val.id}
              resep_image={val.resep_image}
              nama={val.bahan_baku.map((val) => {
                return (
                  <>
                    <ul>
                      <li style={{ listStyle: "none" }}>{val.nama}</li>
                    </ul>
                  </>
                );
              })}
              quantity={val.bahan_baku.map((val) => {
                return (
                  <>
                    <ul>
                      <li style={{ listStyle: "none" }}>
                        {val.komposisi_qty}
                        {val.satuan_komposisi}
                      </li>
                    </ul>
                  </>
                );
              })}
              status={val.status}
              tanggal={moment(val.tanggal).format("LL")}
              total={convertToRupiah(val.total)}
            />
          );
        })}
      </div>
    </div>
  );
}
