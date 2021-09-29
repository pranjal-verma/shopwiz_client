import React, { useState } from "react";
import {
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

        {oldUser ? (
          <Login setOldUser={setOldUser} setModal={setModal} />
        ) : (
          <Signup setOldUser={setOldUser} />
        )}

        <Button onClick={() => setOldUser((prev) => !prev)}>
          New to Shopwiz? Signup Instead
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