import React from "react";
import Swal from "sweetalert2";
import "../navFooter/UserNav.css";

export default function Usernav() {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user data (e.g., tokens, user information) from local storage
        localStorage.clear();

        // Redirect the user to the login page
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="nav">
      <div className="appname">
        <a href="#">Tomato</a>
      </div>
      <div className="options">
        <ul>
          <li>
            <a href="#" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
