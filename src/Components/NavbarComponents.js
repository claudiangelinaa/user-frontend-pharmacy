import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Badge from "@material-ui/core/Badge";
import "../Styles/Components/Navbar.css";
// import "../Styles/Navbar.css";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, doLogout } from '../Store/Actions/authAction';


export default function NavbarComponents() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);
  const history = useHistory();

  useEffect(()=>{
    dispatch(checkLogin())
  }, [])

  const handleLogoutClick = () => {
    dispatch(doLogout());
    history.push("/");
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        {/* <Navbar.Brand style={{ marginLeft: 20 }}>
          <Link className="LinkRoute"  to="/">
          Pharmacy
          </Link>
        </Navbar.Brand> */}
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
            {
              auth.isLogin ? (
                <Nav.Link>
                  <Link className="LinkRoute" to="/UserProfile">
                    My Profile
                  </Link>
                </Nav.Link>
              ) : (
                <>
                </>
              )
            }
          </Nav>
        </Container>

        <div style={{ marginRight: 20 }}>
          <Link className="LinkRoute" to="/Login">
            Login
          </Link>
            {
              // console.log("auth:", auth)
              auth.isLogin ? (
                <>
                  {auth.nama}
                  <Button variant="light" onClick={handleLogoutClick}>
                  Logout
                </Button>
                </>
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
