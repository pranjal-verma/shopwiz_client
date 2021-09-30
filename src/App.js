import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Button, Container, Col, Row } from "reactstrap";

import { Switch, Route, Link } from "react-router-dom";

import {
  Navbar,
  Homepage,
  Category,
  Product,
  Login,
  Signup,
  Orders,
} from "./Screens/";
import { UserContext } from "./context/UserContext";
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

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
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
      </UserContext.Provider>
    </>
  );
}

export default App;
