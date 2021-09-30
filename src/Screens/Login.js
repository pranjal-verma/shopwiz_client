import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import axios from "axios";
import { BASE_URL } from "../config";
import { UserContext } from "../context/UserContext";
function Login({
  isModal = false,
  setOldUser = () => ({}),
  setModal = () => ({}),
}) {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const routeChange = () => {
    let path = `/`;
    history.push(path);
  };
  const { user, setUser } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");

  function handleOnAuthChange(e) {
    setAuthDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");
    const { email, password } = authDetails || {};

    try {
      const result = await axios.post(BASE_URL + "/auth/login", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        email,
        password,
      });
      const data = result?.data || {};
      if (data.error) {
        return setErrorMessage(data.error);
      }
      //   setErrorMessage("Signup Successful");

      // console.table(result);
      console.log(
        "🚀 ~ file: Signup.js ~ line 47 ~ handleSignupSubmit ~ result",
        data,
        Object.keys(result),
        email
      );
      const { token, userId } = data ?? {};
      if (token && userId && email) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        setUser((prev) => ({ ...prev, email, userId, token }));
      }

      setModal((prev) => !prev);
      if (!isModal) routeChange();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          onChange={handleOnAuthChange}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          onChange={handleOnAuthChange}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
        />
      </FormGroup>
      <Button onClick={handleLogin} style={{ margin: "5px 0px" }}>
        Login
      </Button>
      <div>{errorMessage}</div>
    </Form>
  );
}

export default Login;
