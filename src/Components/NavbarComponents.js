import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Badge from "@material-ui/core/Badge";
import "../Styles/Components/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, doLogout } from "../Store/Actions/authAction";
import Typography from "@mui/material/Typography";

export default function NavbarComponents() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  const handleLogoutClick = () => {
    dispatch(doLogout());
    history.push("/");
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container style={{ width: "fit-content" }}>
          <Nav>
            <Nav.Link>
              <Link to="/" className="LinkRoute">
                Home
              </Link>
            </Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link className="LinkRoute" to="/ProductCustom">
                  Product Custom
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="LinkRoute" to="/Products">
                  Product
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <Link className="LinkRoute" to="/History">
                History
              </Link>
            </Nav.Link>
            {auth.isLogin ? (
              <NavDropdown title="My Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link className="LinkRoute" to="/UserProfile">
                    User Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link className="LinkRoute" to={`/reset-password?token=${token}`}>
                    Change Password
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // <Nav.Link>
              //   <Link className="LinkRoute" to="/UserProfile">
              //     My Profile
              //   </Link>
              // </Nav.Link>
              <></>
            )}
          </Nav>
        </Container>

        <div style={{ marginRight: 20 }}>
          {/* <Link className="LinkRoute" to="/Login">
            Login
          </Link> */}
          {
            // console.log("auth:", auth)
            auth.isLogin ? (
              <div style={{ display: "flex" }}>
                <Typography style={{ marginRight: 20 }}>
                  Hello, {auth.nama}
                </Typography>
                <div>
                  <Link className="LinkRoute" onClick={handleLogoutClick}>
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <Link className="LinkRoute" to="/Login">
                Login
              </Link>
            )
          }
        </div>

        <div style={{ marginRight: 20 }}>
          <Badge badgeContent={4} color="error">
            <Link className="LinkRoute" to="/Cart">
              <ShoppingCartOutlinedIcon />
            </Link>
          </Badge>
        </div>

        <div style={{ marginRight: 20 }}>
          <Badge badgeContent={4} color="error">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </div>
      </Navbar>
    </div>
  );
}
