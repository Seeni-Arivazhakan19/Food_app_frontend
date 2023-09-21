import React from "react";
import "../webpages/About.css";
import Navbar from '../navFooter/Navbar';
import tomato from "../../assets/Tomato.png";

export default function About() {
  return (
    <div className="about-container">
      <Navbar />
      <div className="center-content">
        <div className="logo">
          <img src={tomato} alt="Logo" />
        </div>
        <div className="about-box">
          <p>
            Tomato is a food delivery platform developed using React, Spring
            Boot, and MySQL. It allows users to order their favorite meals from
            a variety of restaurants with ease. Our platform connects hungry
            customers with local restaurants, making it convenient for them to
            enjoy delicious food from the comfort of their homes. With a
            user-friendly interface and a wide selection of cuisines, we aim to
            provide a seamless dining experience.
          </p>
        </div>
      </div>
    </div>
  );
}
