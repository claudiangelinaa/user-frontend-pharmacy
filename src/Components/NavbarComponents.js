import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Badge from "@material-ui/core/Badge";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { checkLogin, doLogout } from '../Store/Actions/authAction';

export default function NavbarComponents() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.authReducer);

  useEffect(()=>{
    dispatch(checkLogin())
  }, [])

  const handleLogoutClick = () => {
    dispatch(doLogout());
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
            <Nav.Link>
              <Link className="LinkRoute" to="/UserProfile">
                My Profile
              </Link>
            </Nav.Link>
          </Nav>
        </Container>

        <div style={{ marginRight: 20 }}>
            {
              // console.log("auth:", auth)
              auth.nama ? (
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
