import React, { useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
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
              <NavItem>
                <NavLink
                  style={{
                    cursor: "pointer",
                    width: "fit-content",
                    float: "right"
                  }}
                  href="/auth"
                >
                  SIGNUP/SIGNIN
                </NavLink>
              </NavItem>
            ) : (
              <NavItem className="d-flex">
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
