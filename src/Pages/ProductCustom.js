import React, { useState } from "react";
import ButtonComponent from "../Components/ButtonComponent";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import "../Styles/ProductCustom.css";
import Button from '@material-ui/core/Button';
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { url } from "../helpers/urlConfig";
import { useHistory } from 'react-router-dom';

export default function ProductCustom() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [alamat, setAlamat] = useState('');
  const history = useHistory();
  
  const selectFile = (e) => {
    setSelectedFiles(e.target.files);
    console.log(selectedFiles);
  }

  const handleSubmitPhoto = () => {
    const token = localStorage.getItem("access_token");
    console.log("alamat", alamat)

    if(selectedFiles.length < 1) {
      alert('Silahkan upload resep terlebih dahulu')
    }

    let fd = new FormData();
    fd.append('images', selectedFiles[0]);
    fd.append('alamat', alamat);

    axios.post(`${url}/insertObatRacikTransaction`, fd, { headers : { "Authorization" : token } })
    .then((res) => {
      console.log(res.data)
      alert(`Upload resep berhasil. Silahkan tunggu approval admin.`)
      history.push("/History")
    })
    .catch((err) => {
      console.log(err)
      alert(`Upload resep gagal. Silahkan coba beberapa saat lagi.`)
    })
  }

  return (
    <div className="ProductCustom">
      <h3>Upload Prescription Recipe</h3>

      <div className="InputField">
        <h6>Name</h6>
        <input className="inputs" type="name" placeholder="Masukkan namamu" />

        <h6>Alamat</h6>
        <input className="inputs" type="alamat" placeholder="Masukkan alamatmu" onChange={(e)=>setAlamat(e.target.value)} />

        <h6>Upload Prescription Image</h6>
        <div className="row mb-3">
          <div className="col-2 UploadButton">
            <label htmlFor="contained-button-file" className="col-3">
              <IconButton component="label">
                <input accept="image/*" id="contained-button-file" multiple type="file" hidden onChange={selectFile} />
                <BackupOutlinedIcon fontSize="large" />
              </IconButton>
            </label>
          </div>
          <div className="col-6 FileText">
            <p>
              {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : "No file chosen"}
            </p>
          </div>
        </div>

        <ButtonComponent title={"Submit"} onSubmit={()=>handleSubmitPhoto()} />
      </div>
    </div>
  );
}
