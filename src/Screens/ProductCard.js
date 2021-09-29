import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

function ProductCard({ title = "", description, price, src }) {
  const [stateStyle, setStateStyle] = useState({});
  async function handleBuyNow() {}
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
          <CardText>{description}</CardText>
          <Button onClick={handleBuyNow} style={{ marginRight: "5px" }}>
            Buy Now
          </Button>
          <Button>Add to Cart</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductCard;
