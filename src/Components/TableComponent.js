import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function TableComponent(props) {
  // const { historyTransaction } = useSelector(state => state.transactionReducer)

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaksi ID</th>
            <th>Nama Produk</th>
            <th>Quantity</th>
            <th>Tanggal</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.nama}</td>
            <td>{props.quantity}</td>
            <td>{props.tanggal}</td>
            <td>{props.total}</td>
            <td>{props.status === "0" ? "Waiting for payment" : "Done Payment"}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
