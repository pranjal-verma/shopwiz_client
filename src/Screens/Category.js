import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Col, Row, Container, Badge } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
function Category({}) {
  const { cat } = useParams();
  console.log("🚀 ~ file: Category.js ~ line 6 ~ Category ~ cat", cat);
  const [product, setProducts] = useState([]);

  useEffect(async () => {
    console.log("Category Mounting");
    const axiosResult = await axios.get(
      "http://localhost:3000/products/categoryWiseData",
      { params: { cat } }
    );
    console.log(
      "🚀 ~ file: Category.js ~ line 16 ~ useEffect ~ axiosResult",
      axiosResult
    );
    setProducts(axiosResult);
  }, []);
  return (
    <>
      F Society
      <Container>
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
            {cat} <Badge color="secondary">SALE!</Badge>
          </h1>
        </div>
        <Row>
          {product?.data?.map((item) => (
            <Col xs="auto" sm="6" style={{ margin: "5px 0px" }}>
              <ProductCard
                title={item.title}
                description={item.description}
                src={item.image}
                price={item.price * 1000}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Category;