import React from "react";
import Food from "../../assets/foodapp1.png";
import Navbar from '../navFooter/Navbar';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="image">
        <img src={Food} alt="Food Photo" />
      </div>
      <h1>Tomato: A Food Delivery platform</h1>
      <p>"Delight in Every Bite: Bringing Your Favorites to Your Doorstep"</p>
      <div>
        <Link to="/login">
          <button className="btn btn-primary" style={{ backgroundColor: "crimson" }}>
            User
          </button>
        </Link> &nbsp; 
        <Link to="/Rlogin">
          <button className="btn btn-primary" style={{ backgroundColor: "crimson" }}>
            Restaurant
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
