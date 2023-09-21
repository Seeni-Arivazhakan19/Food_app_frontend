import React, { useEffect, useState } from "react";
import "../../Components/loginSignup/Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Navbar from "../navFooter/Navbar";
import Signupvalidation from "./Signupvalidation";
import axios from "axios";
import "../loginSignup/Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    customer_name: "",
    username:"",
    customer_emailId: "",
    customer_phone_no: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(Signupvalidation(values));
  }
  //   const [selectedGender, setSelectedGender] = useState("");

  // const handleGenderChange = (e) => {
  //   setSelectedGender(e.target.value);
  // };

  useEffect(() => {
    const areAllFieldsFilled =
      values.customer_emailId !== "" &&
      values.password !== "" &&
      values.customer_name !== "" &&
      values.customer_phone_no !== "" &&
      values.address !== "" &&
      values.city !== "" &&
      values.state !== "" &&
      values.zipcode !== "" &&
      values.cpassword !== "";

    if (Object.keys(errors).length === 0 && areAllFieldsFilled) {
      const performRegistration = async () => {
          const body = {
            customer_name: values.customer_name,
            username:values.username,
            customer_emailId: values.customer_emailId,
            customer_phone_no: values.customer_phone_no,
            address: values.address,
            city: values.city,
            state: values.state,
            password: values.password,
            addressText: values.address,
            zipcode: values.zipcode,
          };
          const response = await axios.post(`http://localhost:8080/customer/register`, body);
          const result = response.data;
          if (result.status === "SUCCESS") {
              console.log("if stmt didn't work");
          } else {
            console.error("Registration failed:", result.message);
            alert("User Created");
            navigate("user-dashboard");
          }
      };

      performRegistration();
    }
  }, [errors]);

  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: "100vh" }}>
        <section>
          <div className="forms">
            <h3>User Register</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Name"
                  name="customer_name"
                  value={values.customer_name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small style={{ color: "red" }}>{errors.name}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Name"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <small style={{ color: "red" }}>{errors.username}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="customer_emailId"
                  value={values.customer_emailId}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small style={{ color: "red" }}>{errors.email}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Mobile Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Mobile number"
                  name="customer_phone_no"
                  value={values.customer_phone_no}
                  onChange={handleChange}
                />
                {errors.number && (
                  <small style={{ color: "red" }}>{errors.number}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <small style={{ color: "red" }}>{errors.address}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <small style={{ color: "red" }}>{errors.city}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="state">
                <Form.Label>State:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                />
                {errors.state && (
                  <small style={{ color: "red" }}>{errors.state}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="zipcode">
                <Form.Label>Zipcode:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Zipcode"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                />
                {errors.zipcode && (
                  <small style={{ color: "red" }}>{errors.zipcode}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small style={{ color: "red" }}>{errors.password}</small>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Your Password"
                  name="cpassword"
                  value={values.cpassword}
                  onChange={handleChange}
                />
                {errors.cpassword && (
                  <small style={{ color: "red" }}>{errors.cpassword}</small>
                )}
              </Form.Group>
              <p>Already a User? <a href="/login" style={{textDecoration:"none",color:"crimson"}}>Click here</a></p>
              <Button
                className="button"
                style={{ backgroundColor: "crimson" }}
                type="submit"
              >
                Sign Up
              </Button>{" "}
              &nbsp;
              <Button className="button btn-secondary" type="reset">
                Reset
              </Button>
            </Form>
          </div>
        </section>
      </div>
    </>
  );
}
