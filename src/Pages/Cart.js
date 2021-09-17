import React, { useState } from "react";
import ButtonComponent from "../Components/ButtonComponent";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import "../Styles/Cart.css";
import axios from 'axios'
import { useEffect } from "react";

export default function Cart() {
  const [productsDetail, setProductsDetail] = useState([])
  // useEffect(() => {
  //   axios.get(`http://localhost:5002/obatjadi/${2}`)
  //   .then((res)=>{
  //     console.log(res.data.result)
  //     setProductsDetail(res.data.result)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }, [])
  useEffect(()=>{
    axios.get(`http://localhost:5002/obatjadi/${2}`)
    .then((res)=>{
      console.log(res.data.result)
      setProductsDetail(res.data.result)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  return (
    <div className="Cart">
      <h2>Shopping Cart</h2>

      <div className="Container">
        <div className="Catalog">
          <h3>Cart</h3>

          <div className="CatalogCard">
            <div className="DetailCatalog">
              <div className="ImgContainer"></div>
              <h5>Amphetamine</h5>

              <div className="Icon">
                <IndeterminateCheckBoxOutlinedIcon />
                {"  "}1{"  "}
                <AddBoxOutlinedIcon />
                <div style={{ marginTop: 20 }}>
                  <DeleteOutlineOutlinedIcon />
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Price">
          <h3>The total amount of price</h3>

          <div className="text">
            <h6>Temporary Amount</h6>
            <h6>Delivery Fee</h6>

            <hr />
          </div>

          <h6>Total price</h6>
          <ButtonComponent title={"Checkout"} />
        </div>
      </div>
    </div>
  );
}
