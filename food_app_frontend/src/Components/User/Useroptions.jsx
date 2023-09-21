import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "./Useroptions.css";

export default function Useroptions() {
  const [customer_id, setCustomerId] = useState(null); // Initialize customer_id state

  // Fetch and set the customer_id when the component mounts
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customer/view/1"); // Replace with your API endpoint
        setCustomerId(response.data.customer_id);
      } catch (error) {
        console.error("Error fetching customer ID:", error);
      }
    };

    fetchCustomerId();
  }, []);

  const handleProfileClick = async () => {
    try {
      // Fetch user data from your API using the stored customer_id
      const response = await axios.get(`http://localhost:8080/customer/view/${customer_id}`);

      // Extract user details from the response
      const {
        // username,
        customer_emailId,
        customer_phone_no,
        customer_name,
        address,
        city,
        zipcode,
      } = response.data;

      // Display user details in Swal dialog
      Swal.fire({
        title: `User Profile`,
        html: `
          <p><strong>User ID:</strong> ${customer_id}</p>
          <p><strong>User Email:</strong> ${customer_emailId}</p>
          <p><strong>User Mobile Number:</strong> ${customer_phone_no}</p>
          <p><strong>User Name:</strong> ${customer_name}</p>
          <p><strong>User Address:</strong> ${address}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Zipcode:</strong> ${zipcode}</p>
        `,
        customClass: {
          confirmButton: "ok-button",
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <nav className="user-options">
      <ul>
        <li>
          <Link to="#" onClick={handleProfileClick}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/orders">Order History</Link>
        </li>
        {customer_id && (
          <li>
            <Link to={`/update/${customer_id}`}>Update Details</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
