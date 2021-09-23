import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { doLogin } from "../Store/Actions/authAction";
import { url } from "../helpers/urlConfig";
import axios from "axios";
import { useHistory } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const forgotPassword = () => {
    axios
      .post(`${url}/users/forgot-password`, {
        email: email,
      })
      .then((res) => {
        console.log(res);
        alert(`Berhasil Kirim email`);
        handleClose();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    console.log("login:", email, password)
    axios.post(`http://localhost:5002/users/login`, {email: email,password: password})
    .then((res)=>{
      console.log(res)
      if(res.data.status !== "error") {
        dispatch(doLogin(res.data))
        localStorage.setItem('access_token', res.data.token)
        alert(`Berhasil Login`)
        history.push("/")
      } else {
        alert('Gagal login')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLoginClick}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={handleShow}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot your password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Don't worry! type your email below and we'll help you reset it</p>
          <input
            type="text"
            placeholder="Email Address"
            style={{ padding: 10, borderRadius: 10, outline: "none" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            variant="contained"
            color="primary"
            onClick={forgotPassword}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
