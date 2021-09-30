import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Row,
  Col,
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
// import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { BASE_URL } from "../config";

// UserContext
function PCard({ title = "", description, price, src, id, image, status }) {
  return (
    <>
      {" "}
      <Card>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {price}
            {"Status: " + status}
          </CardSubtitle>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {"Order ID " + id}
          </CardSubtitle>
          <CardText>{description}</CardText>
          {/* <Button>Button</Button> */}
        </CardBody>
      </Card>
    </>
  );
}
function Orders() {
  const token = localStorage.getItem("token");
  console.log("🚀 ~ file: Orders.js ~ line 22 ~ PCard ~ token", token);
  const userId = localStorage.getItem("userId");
  const history = useHistory();
  if (!(token && userId)) history.push("/login");

  const { prod } = useParams();
  console.log("🚀 ~ file: Product.js ~ line 8 ~ Product ~ prod", prod);
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🚀 ~ file: Orders.js ~ line 51 ~ useEffect ~ token", token);
      const userId = localStorage.getItem("userId");
      const axiosResult = await axios.get(
        BASE_URL + "/order/ordByUser/?userId=" + user?.userId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = axiosResult ?? {};
      console.log("🚀 ~ file: Product.js ~ line 16 ~ useEffect ~ data", data);
      setProducts(data);
    } catch (error) {
      console.log("🚀 ~ file: Product.js ~ line 16 ~ useEffect ~ error", error);
    }
  }, []);
  return (
    <>
      <Container>
        <Row>
          <h3>Recent Orders</h3>
          {products.map(({ _id, orderId, productId: product, status }) => (
            <Col>
              <PCard
                key={_id}
                id={orderId}
                title={product?.title}
                description={product?.description}
                image={product?.image}
                price={product?.price}
                status={status}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Orders;
