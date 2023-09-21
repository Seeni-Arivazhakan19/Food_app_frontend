export default function Rvalidation(values) {
    let errors = {};
  
    // Name validation
    if (!values.restaurant_name) {
      errors.restaurant_name = "Name is required";
    }
    // Phone number validation
    if (!values.restaurant_contact) { // Change from values.number
      errors.restaurant_contact = "Phone number is required";
    } else if (!/^\d{10}$/.test(values.restaurant_contact)) {
      errors.restaurant_contact = "Invalid phone number format";
    }
  
    // Address validation
    if (!values.restaurant_address) {
      errors.restaurant_address = "Address is required";
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
  