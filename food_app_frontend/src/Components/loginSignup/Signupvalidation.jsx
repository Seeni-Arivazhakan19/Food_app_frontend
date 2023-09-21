export default function Signupvalidation(values) {
  let errors = {};

  // Name validation
  if (!values.customer_name) {
    errors.customer_name = "Name is required";
  }

  // Email validation
  if (!values.customer_emailId) { // Change from values.email
    errors.customer_emailId = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.customer_emailId)) {
    errors.customer_emailId = "Invalid email format";
  }

  // Phone number validation
  if (!values.customer_phone_no) { // Change from values.number
    errors.customer_phone_no = "Phone number is required";
  } else if (!/^\d{10}$/.test(values.customer_phone_no)) {
    errors.customer_phone_no = "Invalid phone number format";
  }
  // if (!values.customer_gender) {
  //   errors.customer_gender = "Gender is required";
  // }

  // Address validation
  if (!values.address) {
    errors.address = "Address is required";
  }

  // City validation
  if (!values.city) {
    errors.city = "City is required";
  }

  // State validation
  if (!values.state) {
    errors.state = "State is required";
  }

  // Zip code validation
  if (!values.zipcode) {
    errors.zipcode = "Zip code is required";
  } else if (!/^\d{6}$/.test(values.zipcode)) {
    errors.zipcode = "Invalid zip code format";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }

  // Confirm password validation
  if (!values.cpassword) {
    errors.cpassword = "Confirm password is required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords do not match";
  }

  return errors;
}
