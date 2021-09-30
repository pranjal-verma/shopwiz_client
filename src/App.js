import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Button, Container, Col, Row } from "reactstrap";

import { Switch, Route, Link } from "react-router-dom";

import Navbar from "./Screens/Navbar";
import ProductCard from "./Screens/ProductCard";
import { UserContext } from "./context/UserContext";
import Homepage from "./Screens/Homepage";
import CategoryCarousel from "./Screens/CategoryCarousel";
import Category from "./Screens/Category";
import Product from "./Screens/Product";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Orders from "./Screens/Orders";
function App() {
  const userInit = {};
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("userId");

  if (token && email && userId) {
    userInit.token = token;
    userInit.email = email;
    userInit.userId = userId;
  }
  const [user, setUser] = useState({ ...userInit });
  console.log("🚀 ~ file: App.js ~ line 26 ~ App ~ user", user);

  // const {} = useContext();
  useEffect(() => {
    // let token = localStorage.getItem("token");
    // let email = localStorage.getItem("email");
    // setUser("abncdj");
    // // if(email)
  }, []);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        {/* <Button color="primary">primary</Button> <ProductCard /> */}
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route path="/products/:prod">
            <Product />
          </Route>

          <Route path="/login">
            <Container>
              <Login />
            </Container>
          </Route>

          <Route path="/signup">
            <Container>
              <Signup />
            </Container>
          </Route>

          <Route path="/orders">
            <Container>
              <Orders />
            </Container>
          </Route>

          <Route path="/category/:cat">
            <Category />
          </Route>
        </Switch>
        {/* <Homepage /> */}
      </UserContext.Provider>
    </>
  );
}

export default App;
