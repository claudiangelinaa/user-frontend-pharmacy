import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Badge from "@material-ui/core/Badge";
import "../Styles/Components/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, doLogout } from "../Store/Actions/authAction";
import Typography from "@mui/material/Typography";

export default function NavbarComponents() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer);
  const history = useHistory();
  const token = localStorage.getItem("access_token");
  const cart = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    dispatch(checkLogin());
  }, [cart]);

  const handleLogoutClick = () => {
    dispatch(doLogout());
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
            <NavDropdown title="History" id="navbarScrollingDropdown">
              <NavDropdown.Item>              
                <Link className="LinkRoute" to="/History">
                  Obat Jadi
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>              
                <Link className="LinkRoute" to="/RacikHistory">
                  Obat Racik
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            {auth.isLogin ? (
              <NavDropdown title="My Profile" id="navbarScrollingDropdown">
                <NavDropdown.Item>
                  <Link className="LinkRoute" to="/UserProfile">
                    User Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link
                    className="LinkRoute"
                    to={`/reset-password?token=${token}`}
                  >
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
                  <Link className="LinkRoute" onClick={() => handleLogoutClick()} to="/">
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
          <Badge badgeContent={!cart ? 0 : cart.length} color="error">
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
