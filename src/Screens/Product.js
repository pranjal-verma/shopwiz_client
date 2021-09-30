import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../config";
function Product() {
  const { prod } = useParams();
  console.log("🚀 ~ file: Product.js ~ line 8 ~ Product ~ prod", prod);
  const [product, setProduct] = useState({});
  useEffect(async () => {
    try {
      //localhost:3000/products/?productId=61541f6c78feceea2336d4a1
      const axiosResult = await axios.get(
        BASE_URL + "/products/?productId=" + prod
      );
      const { data } = axiosResult ?? {};
      console.log(
        "🚀 ~ file: Product.js ~ line 16 ~ useEffect ~ data",
        axiosResult,
        data
      );
      setProduct(data);
    } catch (error) {
      console.log("🚀 ~ file: Product.js ~ line 16 ~ useEffect ~ error", error);
      // setProduct({})
    }
  }, []);
  return (
    <>
      <Container>
        <ProductCard
          title={product?.title}
          description={product?.description}
          src={product?.image}
          price={product?.price}
          id={product._id}
        />
      </Container>
    </>
  );
}

export default Product;
