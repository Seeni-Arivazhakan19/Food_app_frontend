import React, { useEffect, useState } from "react";
import "../../Components/loginSignup/Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Navbar from "../navFooter/Navbar";
import Rvalidation from "../loginSignup/Rvalidation";
import "../loginSignup/Signup.css";
import axios from "../../Axios";

export default function Rsignup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    restaurant_name: "",
    restaurant_contact: "",
    restaurant_address: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(Rvalidation(values));
  }
  useEffect(() => {
    const areAllFieldsFilled =
      values.password !== "" &&
      values.restaurant_name !== "" &&
      values.restaurant_contact !== "" &&
      values.restaurant_address !== "" &&
      values.cpassword !== "";
  
    if (Object.keys(errors).length === 0 && areAllFieldsFilled) {
      const performRegistration = async () => {
        try {
          await axios.post("http://localhost:8080/restaurant/register", values);
          alert("Registration successful!");
          console.log("working");
          navigate("/Rlogin");
        } catch (error) {
          console.error("Registration failed:", error);
          // Handle registration error here
        }
      };
  
      performRegistration(); // Call the async function
    }
  }, [errors]);
  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: "100vh" }}>
        <section>
          <div className="forms">
            <h3>Restaurant Register</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Restaurant Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter your Name" name="restaurant_name" value={values.restaurant_name} onChange={handleChange} />
                {errors.restaurant_name && <small style={{ color: "red" }}>{errors.restaurant_name}</small>}
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
              <Form.Group className="mb-3" controlId="formBasicMobile">
                <Form.Label>Contact Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Mobile number"
                  name="restaurant_contact"
                  value={values.restaurant_contact}
                  onChange={handleChange}
                />
                {errors.restaurant_contact && <small style={{ color: "red" }}>{errors.restaurant_contact}</small>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control as = "textarea" placeholder="Enter your Address" name="restaurant_address" value={values.restaurant_address} onChange={handleChange} />
                {errors.restaurant_address && <small style={{ color: "red" }}>{errors.restaurant_address}</small>}
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
                {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}
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
                {errors.cpassword && <small style={{ color: "red" }}>{errors.cpassword}</small>}
              </Form.Group>
              <p>Already a User? <a href="/Rlogin" style={{textDecoration:"none",color:"crimson"}}>Click here</a></p>
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
