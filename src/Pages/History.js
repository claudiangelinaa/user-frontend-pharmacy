import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import TableComponent from "../Components/TableComponent";
import { fetchTransaction } from "../Store/Actions/transactionAction";
import LoadingComponent from "../Components/LoadingComponent";
import { convertToRupiah } from "../helpers/convertToRupiah";
import "../Styles/History.css";

export default function History() {
  const dispatch = useDispatch();
  const { historyTransaction, isLoading } = useSelector(
    (state) => state.transactionReducer
  );

  useEffect(() => {
    dispatch(fetchTransaction());
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
      <h2>History Transaction</h2>
      <div className="TableHistory">
        <TableComponent
          id={historyTransaction.id}
          nama={historyTransaction.nama?.map((val) => {
            return (
              <>
                <ul>
                  <li style={{ listStyle: "none" }}>{val}</li>
                </ul>
              </>
            );
          })}
          quantity={historyTransaction.quantity?.map((val) => {
            return (
              <>
                <ul>
                  <li style={{ listStyle: "none" }}>{val}</li>
                </ul>
              </>
            );
          })}
          status={historyTransaction.status}
          tanggal={moment(historyTransaction.tanggal).format("LL")}
          total={convertToRupiah(historyTransaction.total)}
        />
      </div>
    </div>
  );
}
