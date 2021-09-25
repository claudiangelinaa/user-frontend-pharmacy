import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { checkLogin, doRegister } from '../Store/Actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function UserProfile() {
  const user = useSelector(state => state.authReducer)
  const history = useHistory();

  useEffect(()=>{
    if(!user.isLogin){
      history.push("/");
    } else {
      axios.get(`http://localhost:5001/users/${user.id}`)
      .then((res)=>{
        console.log(res.data.result[0]);
        setNama(res.data.result[0].nama)
        setEmail(res.data.result[0].email)
        setNomorTelepon(res.data.result[0].nomor_telepon)
        setGender(res.data.result[0].gender)
        setAlamat(res.data.result[0].alamat)
        setUmur(res.data.result[0].umur)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },[])

  const handleSave = () =>{
    let updatedData = {
      nama,
      email,
      alamat,
      nomor_telepon,
      gender,
      umur
    }
    axios.post(`http://localhost:5001/users/${user.id}`, updatedData)
    .then((res)=>{
      alert(`Data berhasil disimpan`)
      history.push("/")
    })
    .catch(err=>{
      console.log(err);
    })
  }
  
  const classes = useStyles();
  
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomor_telepon, setNomorTelepon] = useState("");
  const [gender, setGender] = useState("");
  const [umur, setUmur] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleEditPhoto = (e) =>{
    setSelectedFile(e.target.files)
    console.log(selectedFile)
  }
  
  const handleSubmitPhoto = () => {
    console.log("submit photo")
    const token = localStorage.getItem("access_token")
    console.log("token:", token)
    console.log("file:", selectedFile)

    let fd = new FormData();
    fd.append('images', selectedFile[0])

    axios.post("http://localhost:5001/users/profile-picture", fd, { headers : { "Authorization" : token } })
    .then(res => {
      console.log("res:", res.data)
      alert(`Upload photo sukses`)
    })
    .catch(err => console.log(err))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {user.nama}
        </Typography>

        <div>
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" multiple type="file" onChange={e => handleEditPhoto(e)} />
          </label>
          <Button variant="contained" onClick={() => handleSubmitPhoto()} >
            Submit Photo
          </Button>
        </div>

        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="Nama"
                variant="outlined"
                required
                fullWidth
                id="Nama"
                label="Nama"
                autoFocus
                value={nama}
                onChange={e => setNama(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="alamat"
                label="Alamat"
                type="text"
                id="Alamat"
                autoComplete="Alamat"
                value={alamat}
                onChange={e => setAlamat(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="nomor_telepon"
                label="Nomor Telepon"
                type="text"
                id="Nomor_Telepon"
                autoComplete="Nomor_Telepon"
                value={nomor_telepon}
                onChange={e => setNomorTelepon(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} >
            <InputLabel htmlFor="filled-age-native-simple" className={classes.formControl}>Gender</InputLabel>
            <Select
                native
                variant="outlined"
                value={gender}
                inputProps={{
                    name: 'gender',
                    id: 'outlined-gender-native-simple',
                }}
                onChange={e=>{setGender(e.target.value)}}
            >
                <option aria-label="None" value="">Gender </option>
                <option value='Pria'>Pria</option>
                <option value='Wanita'>Wanita</option>
            </Select>
            </Grid>

            <Grid item xs={12} sm={6} >
            <InputLabel htmlFor="filled-age-native-simple" className={classes.formControl}>Age</InputLabel>
            <Select
                native
                variant="outlined"
                value={umur}
                inputProps={{
                    name: 'age',
                    id: 'filled-age-native-simple',
                }}
                onChange={e => setUmur(e.target.value)}
            >
                <option aria-label="None" value={0}>Umur</option> 
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
                <option value={22}>22</option>
                <option value={23}>23</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={26}>26</option>
                <option value={27}>27</option>
                <option value={28}>28</option>
                <option value={29}>29</option>
                <option value={30}>30</option>
                <option value={31}>31</option>
                <option value={32}>32</option>
                <option value={33}>33</option>
                <option value={34}>34</option>
                <option value={35}>35</option>
                <option value={36}>36</option>
            </Select>
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>handleSave()}
          >
            Save Changes
          </Button>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
