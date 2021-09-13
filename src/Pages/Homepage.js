import React from "react";
import "../Styles/Homepage.css";
import Background from "../Assets/Bg.jpg";

export default function Homepage() {
  return (
    <div className="Homepage">
      <div className="Header">
        <h1>Welcome to our Pharmacy store</h1>
        <div style={{ fontSize: 20, paddingTop: 20 }}>
          Our store provide best products to consume for our customer
        </div>
        <div className="Button">Learn More</div>
      </div>
      <div className="Background">
        <img src={Background} width="800" height="600" alt="bg" />
      </div>
    </div>
  );
}
