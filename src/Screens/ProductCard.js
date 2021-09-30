import axios from "axios";
import React, { useState, useContext, useCallback } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoginModal from "./LoginModal";
import { BASE_URL } from "../config";

function ProductCard({ title = "", description, price, src, id }) {
  const [stateStyle, setStateStyle] = useState({});
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [purschased, setPurchased] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleAuth = () => setAuthModal(!authModal);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const routeChange = () => {
    let path = `/login`;
    history.push(path);
  };
  const handlePayNow = useCallback(async () => {
    setErrorMessage("");
    // grab token from local storage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    console.log("🚀 ~ file: ProductCard.js ~ line 49 ~ handlePayNow ~ id", id);

    try {
      if (token && userId) {
        // throw new Error("pranjkal error");
        const response = await axios.post(
          BASE_URL + "/order/ord/",
          {
            userId: userId,
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(
          "🚀 ~ file: ProductCard.js ~ line 43 ~ handlePayNow ~ response",
          response
        );
        setPurchased(false);
      } else {
        // setAuthModal();
        routeChange();
      }
    } catch (error) {
      console.log("error", error.message);
      if ((error.message = "Request failed with status code 401")) {
        toggle();
        toggleAuth();
      }
      setErrorMessage(error.message);
    }
  }, []);
  const handleBuyNow = useCallback(async function (e) {
    e.preventDefault();
    setPurchased(true);
    setErrorMessage("");
    console.log("BUY NOW");
    toggle();
    // check whether user is authenticated
    // if not then render login-signup modal
  }, []);

  return (
    <div
      style={{ cursor: "pointer", ...stateStyle }}
      onMouseEnter={() =>
        setStateStyle({
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        })
      }
      onMouseLeave={() => setStateStyle({})}
    >
      <Card>
        <CardImg
          style={{ maxHeight: "200px", maxWidth: "200px" }}
          top
          width="100px"
          src={src}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Rs. {price}
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            pid {id}
          </CardSubtitle>
          <CardText>{description}</CardText>
          <Button onClick={handleBuyNow} style={{ marginRight: "5px" }}>
            Buy Now
          </Button>
          <Button>Add to Cart</Button>
        </CardBody>
      </Card>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Pay {price}</ModalHeader>
        {purschased ? (
          <>
            {" "}
            <ModalBody>
              <h3> Are you sure you want to purschase this product?</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handlePayNow}>
                Pay Now
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
              <div>{errorMessage}</div>
            </ModalFooter>
          </>
        ) : (
          <>
            {" "}
            <ModalBody>
              <Link to="/orders">
                {" "}
                <h3>Purchased Successfuly.</h3>
              </Link>
            </ModalBody>
          </>
        )}
      </Modal>

      <LoginModal modal={authModal} setModal={setAuthModal}></LoginModal>
    </div>
  );
}

export default ProductCard;
