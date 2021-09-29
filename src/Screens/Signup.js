import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, FormText, Button } from "reactstrap";
import axios from "axios";

import { validateEmail, validatePassword } from "../utils/index";

function Signup({ setOldUser = () => ({}) }) {
  const [authDetails, setAuthDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  function handleOnAuthChange(e) {
    setAuthDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSignupSubmit(e) {
    // validate email client side
    e.preventDefault();
    setErrorMessage("");
    const { email, password, confirmPassword } = authDetails || {};
    // if (!validateEmail(email))
    //   return setErrorMessage("Please provid a valid email");
    // if (!validatePassword(password))
    //   return setErrorMessage(`
    //   Password must contain \n
    // At least one uppercase letter
    // At least one lowercase letter
    // At least one digit
    // At least one special symbol
    // should be more than 4 character`);

    if (password != confirmPassword)
      return setErrorMessage("Passwords do not match");
    try {
      const result = await axios.post("http://localhost:3000/auth/signup", {
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
      setErrorMessage("Signup Successful");
      setTimeout(() => {
        setOldUser((prev) => !prev);
      }, 500);
      // console.table(result);
      console.log(
        "🚀 ~ file: Signup.js ~ line 47 ~ handleSignupSubmit ~ result",
        data,
        Object.keys(result)
      );
      setErrorMessage("signup successfull");
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log(
      "🚀 ~ file: Signup.js ~ line 6 ~ Signup ~ authDetails",
      authDetails
    );
  }, [authDetails]);
  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          onChange={handleOnAuthChange}
          type="email"
          name="email"
          id="exampleEmail"
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          onChange={handleOnAuthChange}
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Confirm Password</Label>
        <Input
          onChange={handleOnAuthChange}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm password"
        />
      </FormGroup>

      <Button onClick={handleSignupSubmit}>Submit</Button>
      <div>{errorMessage}</div>
    </Form>
  );
}

export default Signup;
