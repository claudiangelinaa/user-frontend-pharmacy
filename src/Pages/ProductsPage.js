import React from "react";
import CardComponent from "../Components/CardComponent";
import SearchBarComponent from "../Components/SearchBarComponent";
import "../Styles/Products.css";

export default function ProductsPage() {
  return (
    <div className="ProductPage">
      <h1>Products</h1>
      <div className="SearchBar">
        <SearchBarComponent />
      </div>
      <div className="Products">
        <CardComponent />
      </div>
    </div>
  );
}
