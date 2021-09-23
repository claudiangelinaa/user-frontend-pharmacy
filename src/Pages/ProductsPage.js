import React, { useEffect, useState } from "react";
import CardComponent from "../Components/CardComponent";
import SearchBarComponent from "../Components/SearchBarComponent";
import "../Styles/Products.css";
import { useSelector } from "react-redux";
import { fetchProducts } from "../Store/Actions/productsAction";
import LoadingComponent from "../Components/LoadingComponent";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { doInitProducts } from "../Store/Actions/productsAction";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import ButtonComponent from "../Components/ButtonComponent";
import ModalComponent from "../Components/ModalComponent";

// export default function ProductsPage() {
//   // const [products, setProducts] = useState([]);
//   const { products, isLoading } = useSelector((state) => state.productsReducer);

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 30,
  },
  media: {
    height: 120,
  },
});

export default function ProductsPage() {
  const { products, isLoading } = useSelector((state) => state.productsReducer);
  //   const products = useSelector((state) => state.productsReducer);
  const [productsView, setProductsView] = useState(products);
  const [productsFilter, setProductsFilter] = useState("");
  const [productsSortBy, setProductsSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const handleFilter = () => {
    let newProductsArr = products.filter(
      (product) => product.kategori === productsFilter
    );
    // console.log(newProductsArr)
    setProductsView(newProductsArr);
    setDialog(false);
  };

  const handleSort = () => {
    // console.log(productsSortBy)
    // console.log("products:", products)
    setProductsView(products);
    // console.log("productsView:", productsView)
    if (productsSortBy == "nama") {
      productsView.sort((a, b) =>
        a.nama > b.nama ? 1 : b.nama > a.nama ? -1 : 0
      );
    } else if (productsSortBy == "harga") {
      productsView.sort((a, b) =>
        a.harga > b.harga ? 1 : b.harga > a.harga ? -1 : 0
      );
    }
    // console.log(productsView.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0)))
    setDialog(false);
  };

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    setSearch(searchValue);

    let newProductsArr = products.filter((product) =>
      product.nama.includes(searchValue)
    );
    // console.log(newProductsArr)
    setProductsView(newProductsArr);
  };

  // function onSubmit(product) {
  //   console.log(product)
  //   let data = {
  //     id: product.id,
  //     nama: product.nama,
  //     harga: product.harga,
  //     foto_produk: product.foto_produk,
  //     stock: product.stock,
  //     deskripsi: product.deskripsi,
  //     quantity: 1,
  //   };
  //   let getData = JSON.parse(localStorage.getItem("cart")) || [];
  //   getData.push(data);
  //   localStorage.setItem("cart", JSON.stringify(getData));
  // }

  useEffect(() => {
    dispatch(fetchProducts());
    // dispatch(doInitProducts());
  }, []);

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

    return (
      <div className="ProductPage">
        <h1>Products</h1>

        <div className="SearchBar">
          <TextField
            id="standard-textarea"
            label="Search Products"
            value={search}
            onChange={(e) => {
              handleSearch(e);
            }}
            multiline
          />
        </div>

        {/* <div>
          <Button variant="outlined" onClick={() => setDialog(true)}>
            Filter
          </Button>
          <Dialog open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>FILTER</DialogTitle>
            <Select
              native
              variant="outlined"
              value={productsFilter}
              inputProps={{
                name: "Category",
                id: "filled-age-native-simple",
              }}
              onChange={(e) => setProductsFilter(e.target.value)}
            >
              <option aria-label="CATEGORY" value="CATEGORY">
                Category
              </option>
              <option value={"Generik"}>GENERIK</option>
              <option value={"Paten"}>PATEN</option>
            </Select>

            <DialogActions>
              <Button onClick={() => setDialog(false)}>Cancel</Button>
              <Button onClick={() => handleFilter()}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Button variant="outlined" onClick={() => setDialog(true)}>
            Sort
          </Button>
          <Dialog open={dialog} onClose={() => setDialog(false)}>
            <DialogTitle>SORT</DialogTitle>
            <Select
              native
              variant="outlined"
              value={productsSortBy}
              inputProps={{
                name: "Category",
                id: "filled-age-native-simple",
              }}
              onChange={(e) => setProductsSortBy(e.target.value)}
            >
              <option aria-label="SORT BY" value="default">
                Sort by
              </option>
              <option value={"nama"}>NAMA</option>
              <option value={"harga"}>HARGA</option>
            </Select>

            <DialogActions>
              <Button onClick={() => setDialog(false)}>Cancel</Button>
              <Button onClick={() => handleSort()}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div> */}
        <div className="Products">
        {products.map((val) => {
          return (
            <CardComponent
              id={val.id}
              foto_produk={val.foto_produk}
              nama={val.nama}
              deskripsi={val.deskripsi}
              harga={val.harga}
              stock={val.stock}
            />
          );
        })}

        {/* {/* <div style={{ display: "flex", flexDirection: "column" }}>
          {productsView.map((product) => {
            return (
              <div className="Products ProductPage " key={product.id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={product.foto_produk}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="body2" component="">
                        {product.nama}
                      </Typography>
                      <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.deskripsi}
                    </Typography>
                    </CardContent>

                    <CardContent>
                      <strong>Rp. {product.harga}</strong>
                    </CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Stok : {product.stock}
                    </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    Kategori : {product.kategori}
                  </Typography>
                  </CardActionArea>
                  <CardActions>
                    <ButtonComponent
                      title={"Add To Cart"}
                      onClick={() => onSubmit(product)}
                    />
                  </CardActions>
                </Card>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  }