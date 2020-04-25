import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import { useSelector } from "react-redux";

function Navigation() {
  const [collapsed, setCollapsed] = useState(true);
  const auth = useSelector(state => state.auth.isAuthenticated);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar color="light" light expand="sm">
        <NavbarBrand href="/">SHOPPING LIST</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {!auth ? (
              <>
                <NavItem>
                  <Register />
                </NavItem>
                <NavItem>
                  <Login />
                </NavItem>
              </>
            ) : (
              <NavItem>
                <Logout />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
