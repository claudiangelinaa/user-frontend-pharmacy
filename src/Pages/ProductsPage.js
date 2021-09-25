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
import PaginateComponent from "../Components/PaginateComponent";
import { ContactsOutlined } from "@material-ui/icons";

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
  useEffect(() => {
    dispatch(fetchProducts());
    // dispatch(doInitProducts());
  }, []);

  const { products, isLoading } = useSelector((state) => state.productsReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [productsView, setProductsView] = useState(products);
  const [productsFilter, setProductsFilter] = useState("");
  const [productsSortBy, setProductsSortBy] = useState("");
  const [search, setSearch] = useState("");
  const [dialogFilter, setDialogFilter] = useState(false);
  const [dialogSort, setDialogSort] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFilter = () => {
    if (productsFilter !== "") {
      let newProductsArr = products.filter(
        (product) => product.kategori === productsFilter
      );
      setProductsView(newProductsArr);
    } else {
      setProductsView(products);
    }
    setDialogFilter(false);
  };

  const handleSort = () => {
    setProductsView(products);
    if (productsSortBy == "nama") {
      setProductsView(
        productsView.sort((a, b) =>
          a.nama > b.nama ? 1 : b.nama > a.nama ? -1 : 0
        )
      );
    } else if (productsSortBy == "harga") {
      setProductsView(
        productsView.sort((a, b) =>
          a.harga > b.harga ? 1 : b.harga > a.harga ? -1 : 0
        )
      );
    }
    // console.log(productsView.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0)))
    setDialogSort(false);
  };

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    setSearch(searchValue);

    let newProductsArr = products.filter((product) =>
      product.nama.toLowerCase().includes(searchValue.toLowerCase())
    );
    // console.log(newProductsArr)
    setProductsView(newProductsArr);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productsView.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

      <div>
        <Button variant="outlined" onClick={() => setDialogFilter(true)}>
          Filter
        </Button>
        <Dialog open={dialogFilter} onClose={() => setDialogFilter(false)}>
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
            <option aria-label="CATEGORY" value="">
              Category
            </option>
            <option value={"Generik"}>GENERIK</option>
            <option value={"Paten"}>PATEN</option>
          </Select>

          <DialogActions>
            <Button onClick={() => setDialogFilter(false)}>Cancel</Button>
            <Button onClick={() => handleFilter()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Button variant="outlined" onClick={() => setDialogSort(true)}>
          Sort
        </Button>
        <Dialog open={dialogSort} onClose={() => setDialogSort(false)}>
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
            <Button onClick={() => setDialogSort(false)}>Cancel</Button>
            <Button onClick={() => handleSort()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="Products">
        {search
          ? productsView.map((val) => {
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
            })
          : currentPosts.map((val) => {
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
      <PaginateComponent
        postsPerPage={postsPerPage}
        totalPosts={productsView.length}
        paginate={paginate}
      />
    </div>
  );
}
