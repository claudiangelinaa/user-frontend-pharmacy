import React, { useEffect, useState } from "react";
import ButtonComponent from "../Components/ButtonComponent";
import "../Styles/Cart.css";
import { convertToRupiah } from "../helpers/convertToRupiah";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function Cart() {
  const history = useHistory();
  const [cartProduct, setcartProduct] = useState([]);
  const [cartTotalPrice, setcartTotalPrice] = useState([]);
  const [quantity, setQuantity] = useState("");

  function CheckOut() {
    localStorage.setItem("checkout", JSON.stringify(cartProduct));
    localStorage.setItem("cart", JSON.stringify([]));
    history.push("/Checkout");
  }

  function changeQuantity(product) {
    const index = cartProduct.findIndex(
      (products) => products.id == product.id
    );

    const qty = (cartProduct[index].quantity = Number(quantity));

    if (qty > product.stock) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Quantity must be less than stock",
      });
    } else {
      cartProduct[index].quantity = Number(quantity);
      setcartProduct(cartProduct);
      localStorage.setItem("cart", JSON.stringify(cartProduct));
    }
    filterProduct();
  }

  function removeItems(id) {
    const data = cartProduct.filter((value) => value.id !== id);
    localStorage.setItem("cart", JSON.stringify(data));
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");

    let sums = cartData.reduce((sum, i) => (sum += i.harga * i.quantity), 0);

    setcartTotalPrice(sums);
    setcartProduct(cartData);
    filterProduct();
  }

  function filterProduct() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    let results = cart.filter(
      (ele, ind) => ind === cart.findIndex((elem) => elem.id === ele.id)
    );
    let sums = results.reduce((sum, i) => (sum += i.harga * i.quantity), 0);
    setcartTotalPrice(sums);
    setcartProduct(results);
  }

  useEffect(() => {
    filterProduct();
  }, []);

  return (
    <div className="Cart">
      <h2>Shopping Cart</h2>
      {cartProduct.map((val) => {
        return (
          <>
            <div class="Cart-Items">
              <div class="image-box">
                <img src={val.foto_produk} style={{ height: 120 }} />
              </div>
              <div class="about">
                <h4>{val.nama}</h4>
              </div>
              <div class="counter">
                <input
                  min="1"
                  defaultValue={val.quantity}
                  style={{ width: 100, padding: 10, marginRight: 20 }}
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <ButtonComponent
                  onSubmit={() => changeQuantity(val)}
                  title={"Change"}
                />
              </div>
              <div class="prices">
                <div class="amount">
                  {convertToRupiah(val.harga)}
                  {"   "} x {val.quantity} pcs
                </div>
                <div class="remove" onClick={() => removeItems(val.id)}>
                  <u>Remove</u>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <hr />
      <div class="checkout">
        <div class="total">
          <div>
            <div class="Subtotal">Sub-Total</div>
            <div class="items">{cartProduct.length} items</div>
          </div>
          <div class="total-amount">
            {cartProduct.length === 0 ? 0 : convertToRupiah(cartTotalPrice)}
          </div>
        </div>
        <button class="buttons" onClick={CheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
}
