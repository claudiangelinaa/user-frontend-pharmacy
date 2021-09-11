import React from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import Badge from "@material-ui/core/Badge";
import "../Styles/Navbar.css";
import { Link } from "react-router-dom";

export default function NavbarComponents() {
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
            <Nav.Link className="LinkRoute" to="/">
              Home
            </Nav.Link>
            <Nav.Link>About</Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link className="LinkRoute" to="/Products">
                  Product Custom
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link className="LinkRoute" to="/ProductCustom">
                  Product
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <Link className="LinkRoute" to="/History">
                History
              </Link>
            </Nav.Link>
          </Nav>
        </Container>

        <div style={{ marginRight: 20 }}>
          <Badge badgeContent={4} color="error">
            <ShoppingCartOutlinedIcon />
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
