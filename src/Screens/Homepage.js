import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Badge, Button } from "reactstrap";
import { Router, Link } from "react-router-dom";
import Product from "./ProductCard";
const items = [
  {
    src: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    altText: "Slide 1",
    caption: "Buy now",
  },
  {
    src: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    altText: "Slide 2",
    caption: "Buy Now",
  },
  {
    src: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    altText: "Slide 3",
    caption: "Buy Now!",
  },
];
function Homepage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [products, setProducts] = useState([]);
  useEffect(async () => {
    try {
      const axiosResponse = await axios.get(
        "http://localhost:3000/products/categoryProducts"
      );
      let { data } = axiosResponse || {};
      console.log(
        "🚀 ~ file: Homepage.js ~ line 30 ~ useEffect ~ products",
        data
      );

      const {
        electronics = [],
        // "women's clothing" = [],
        // "men's clothing"= [],
        jewelery = [],
      } = data || {};

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  let temp = [];
  for (let i = 0; i < 10; i++) {
    temp.push("   ");
  }
  return (
    <>
      {/*  Carousel for popular items */}
      {/* <Row style={{ maxHeight: "500px" }}> */}
      {/* Shop By Category  */}
      {/* Deal of the day */}
      {/* </Row> */}
      <div style={{ margin: "10px" }}>
        {/* <Row style={{ maxHeight: "100px" }}></Row> */}
        <Container>
          {/* <Row>
            {temp.map(() => {
              return (
                <Col
                  md="3"
                  lg="4"
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Product></Product>
                </Col>
              );
            })}
          </Row> */}

          {products.map((product) => {
            console.log(
              "🚀 ~ file: Homepage.js ~ line 93 ~ {products.map ~ product",
              product
            );

            return (
              <>
                {" "}
                <div
                  style={{
                    margin: "5px 1px ",
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <h1 style={{ color: "black" }}>
                    {/* {product.category + "  asdf"} */}
                    {product.category} <Badge color="secondary">New</Badge>
                  </h1>

                  <Button style={{ margin: "5px" }} color="primary">
                    View All
                  </Button>
                </div>
                <Row>
                  {product?.data?.map((item) => (
                    <Col xs="auto" sm="6" lg="4" style={{ margin: "5px 0px" }}>
                      <Product
                        title={item.title}
                        description={item.description}
                        src={item.image}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            );
          })}
        </Container>
      </div>
    </>
  );
}

export default Homepage;
