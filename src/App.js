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
function App() {
  const userInit = {};
  const [user, setUser] = useState({});

  // const {} = useContext();
  useEffect(() => {
    let token = localStorage.getItem("token");
    let email = localStorage.getItem("email");
    setUser("abncdj");
    // if(email)
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

          <Route path="/products">
            <CategoryCarousel />
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
