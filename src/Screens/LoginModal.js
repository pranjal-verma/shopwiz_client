import React, { useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Login from "./Login";
import Signup from "./Signup";

const SIGN_UP = " New to Shopwiz? Signup Instead";
const LOGIN = "Already a user? Login Instead";
function AuthModal({ show = false, modal, setModal }) {
  // const [modal, setModal] = useState(show);
  const toggle = () => setModal(!modal);
  const [oldUser, setOldUser] = useState(false);
  return (
    <>
      <Modal
        isOpen={modal}
        toggle={toggle}
        // style={{ padding: "40px", width: "100%" }}
      >
        <ModalHeader toggle={toggle}>Welcome!</ModalHeader>
        <Container>
          {oldUser ? (
            <Login setOldUser={setOldUser} setModal={setModal} isModal={true} />
          ) : (
            <Signup setOldUser={setOldUser} isModal={true} />
          )}
        </Container>
        <Button
          style={{ margin: "10px" }}
          onClick={() => setOldUser((prev) => !prev)}
        >
          {oldUser ? SIGN_UP : LOGIN}
        </Button>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </>
  );
}

export default AuthModal;
