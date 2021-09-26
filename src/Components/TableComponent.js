import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../Styles/Components/TableComponent.css";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import axios from "axios";
import { url } from "../helpers/urlConfig";

export default function TableComponent(props) {
  const [dialogUpload, setDialogUpload] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const selectFile = (e) => {
    setSelectedFiles(e.target.files);
    console.log(selectedFiles);
  }

  const handleSubmitBuktiBayar = () => {
    const token = localStorage.getItem("access_token");

    if(selectedFiles.length < 1) {
      alert('Silahkan upload bukti bayar terlebih dahulu')
    }

    let fd = new FormData();
    fd.append('images', selectedFiles[0]);

    axios.post(`${url}/uploadBuktiBayar/${props.id}`, fd, { headers : { "Authorization" : token } })
    .then((res) => {
      console.log(res.data)
      alert(`Upload bukti bayar berhasil. Terima kasih telah bertransaksi.`)
      setDialogUpload(false)
      window.location.reload()
    })
    .catch((err) => {
      console.log(err)
      alert(`Upload bukti bayar gagal. Silahkan coba beberapa saat lagi.`)
    })
  }

  return (
    <div>
      <Dialog open={dialogUpload} onClose={() => setDialogUpload(false)}>
        <DialogTitle>Upload Bukti Bayar</DialogTitle>
       
        <div>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" onChange={selectFile} />
          </label>
        </div>

        <DialogActions>
          <Button onClick={() => setDialogUpload(false)}>Cancel</Button>
          <Button onClick={() => handleSubmitBuktiBayar()}>Submit</Button>
        </DialogActions>
      </Dialog>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Transaksi ID</th>
            <th>Nama Produk</th>
            <th>Quantity</th>
            <th>Tanggal</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.id}</td>
            <td>{props.nama}</td>
            <td>{props.quantity}</td>
            <td>{props.tanggal}</td>
            <td>{props.total}</td>
            <td>
              <div
                className={props.status === "0" ? "waitPayment" : "donePayment"}
              >
                {props.status === "0" ? "Waiting for payment" : "Done Payment"}
              </div>
            </td>
            <td>
            <div
                // className={props.status === "0" ? "waitPayment" : "donePayment"}
              >
                {
                  props.status === "0" ? 
                    (
                      <Button size="small" onClick={()=>setDialogUpload(true)}>Upload Bukti Bayar</Button>
                    ) 
                  : 
                    null
                }
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
