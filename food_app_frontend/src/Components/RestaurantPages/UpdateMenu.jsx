import React, { useState, useEffect } from "react";
import Usernav from "../navFooter/UserNav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateMenu() {
  const navigate = useNavigate();
  const { menu_id } = useParams();

  // Define state for form data
  const [formData, setFormData] = useState({
    dish_name: "",
    category: "",
    // quantity: 0,
    dish_price: "",
  });

  // Define a function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Check if menu_id is defined
    if (!menu_id) {
      console.error("menu_id is not defined.");
      return;
    }

    // Fetch existing menu item data from the server
    axios
      .get(`http://localhost:8080/menu/view/${menu_id}`)
      .then((response) => {
        // Populate formData with existing data
        setFormData({
          dish_name: response.data.dish_name,
          category: response.data.category,
          // quantity: response.data.quantity,
          dish_price: response.data.dish_price,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error fetching menu item data:", error.response.status, error.response.data);
        } else if (error.request) {
          console.error("Error making the request:", error.request);
        } else {
          console.error("General error:", error.message);
        }
      });
  }, [menu_id]);

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API request to update the menu item with formData
    axios
      .put(`http://localhost:8080/menu/update/${menu_id}`, formData)
      .then(() => {
        // Handle the successful update (e.g., show a success message)
        // console.log("Menu item updated successfully:", response.data);
        alert("Updated Successfully");
        navigate("/restaurant-dashboard");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error updating menu item:", error.response.status, error.response.data);
          // Handle error and provide user feedback
        } else if (error.request) {
          console.error("Error making the request:", error.request);
        } else {
          console.error("General error:", error.message);
        }
      });
  };

  return (
    <>
      <Usernav />
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDishName">
            <Form.Label>Dish Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Dish Name"
              name="dish_name"
              value={formData.dish_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Dish Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formDishPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              name="dish_price"
              value={formData.dish_price}
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            style={{ background: "crimson" }}
            type="submit"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
}
