import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  NavbarText,
} from "reactstrap";
import { UserContext } from "../context/UserContext";
import LoginModal from "./LoginModal";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const { token, userId, email } = user || {};

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  function handleLogout() {
    localStorage.clear();
  }
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "flex",
        padding: "2px 2px",
        margin: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Navbar color="dark" dark expand="md">
        <NavbarBrand style={{ paddingLeft: "5px" }} href="/">
          ShopWiz {String(user?.email)}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar style={{ flex: 1 }}>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {" "}
            {user?.email ? <div> {"Hello " + user?.email}</div> : ""}
          </NavbarText>
        </Collapse>
      </Navbar>
      <div className="greetings" style={{ color: "white" }}></div>
      {!(token && email && userId) ? (
        <Button
          style={{ justifyContent: "flex-end" }}
          onClick={() => setModal((prev) => !prev)}
          primary
        >
          Login
        </Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}

      <LoginModal modal={modal} setModal={setModal}></LoginModal>
    </div>
  );
};

export default Example;
