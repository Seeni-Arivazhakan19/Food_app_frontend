import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Usernav from '../navFooter/UserNav';

export default function Cupdate() {
  const navigate = useNavigate();
  const { customer_id } = useParams(); // Retrieve the customer ID from the URL

  // Define state for form data
  const [formData, setFormData] = useState({
    customer_name: '',
    username: '',
    customer_emailId: '',
    customer_phone_no: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });

  // Define a function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch existing customer data and populate the form
  useEffect(() => {
    // Check if customer_id is valid before making the API request
    if (!customer_id || isNaN(parseInt(customer_id))) {
      console.error('Invalid customer_id:', customer_id);
      // You can show an error message to the user or redirect them to an error page
      return;
    }

    // Fetch existing customer data from the server using the customer_id from URL
    axios
      .get(`http://localhost:8080/customer/view/${customer_id}`)
      .then((response) => {
        // Populate formData with existing data
        setFormData({
          customer_name: response.data.customer_name,
          username: response.data.username,
          customer_emailId: response.data.customer_emailId,
          customer_phone_no: response.data.customer_phone_no,
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          zipcode: response.data.zipcode,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error fetching customer data:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('Error making the request:', error.request);
        } else {
          console.error('General error:', error.message);
        }
      });
  }, [customer_id]);

  // Define a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API request to update the customer with formData
    axios
      .put(`http://localhost:8080/customer/update/${customer_id}`, formData)
      .then(() => {
        // Handle the successful update (e.g., show a success message)
        alert('Updated Successfully');
        navigate(`/userdashboard/${customer_id}`); // Redirect to the user dashboard with the customer_id
      })
      .catch((error) => {
        if (error.response) {
          console.error('Error updating customer:', error.response.status, error.response.data);
          // Handle error and provide user feedback
        } else if (error.request) {
          console.error('Error making the request:', error.request);
        } else {
          console.error('General error:', error.message);
        }
      });
  };

  return (
    <>
      <Usernav />
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Render form fields */}
          <div className="mb-3">
            <label htmlFor="customer_name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="customer_name"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div> */}
          <div className="mb-3">
            <label htmlFor="customer_emailId" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="customer_emailId"
              name="customer_emailId"
              value={formData.customer_emailId}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="customer_phone_no" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              id="customer_phone_no"
              name="customer_phone_no"
              value={formData.customer_phone_no}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="zipcode" className="form-label">
              Zipcode
            </label>
            <input
              type="text"
              className="form-control"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ background: 'crimson' }}>
            Update
          </button>
        </form>
      </div>
    </>
  );
}
