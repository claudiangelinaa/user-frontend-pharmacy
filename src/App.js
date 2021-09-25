import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavbarComponents from "./Components/NavbarComponents";
import Cart from "./Pages/Cart";
import History from "./Pages/History";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./Pages/ProductsPage";
import ProductCustom from "./Pages/ProductCustom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ResetPassword from "./Pages/ResetPassword";
import Checkout from "./Pages/Checkout";
import UserProfile from "./Pages/UserProfile";
import Verification from "./Pages/Verification";
import ProductDetail from "./Pages/ProductDetail";


function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponents />

        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/Products">
            <ProductsPage />
          </Route>
          <Route path="/product-detail/:id" component={ProductDetail}>
          </Route>
          <Route exact path="/ProductCustom">
            <ProductCustom />
          </Route>
          <Route exact path="/History">
            <History />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Register">
            <Register />
          </Route>
          <Route exact path="/Cart">
            <Cart />
          </Route>
          <Route exact path="/Checkout">
            <Checkout />
          </Route>
          <Route exact path="/reset-password">
            <ResetPassword />
          </Route>
          <Route exact path="/verify-account">
            <Verification />
          </Route>
          <Route exact path="/UserProfile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
