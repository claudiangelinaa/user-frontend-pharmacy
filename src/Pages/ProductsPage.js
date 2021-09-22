import React from "react";
import CardComponent from "../Components/CardComponent";
import SearchBarComponent from "../Components/SearchBarComponent";
import "../Styles/Products.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useEffect } from "react";
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
import { useSelector } from "react-redux";
import ModalComponent from "../Components/ModalComponent";

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(doInitProducts());
  }, []);

  const products = useSelector((state) => state.productsReducer);
  const [productsView, setProductsView] = useState(products);
  const [productsFilter, setProductsFilter] = useState('');
  const [productsSort, setProductsSort] = useState('');
  const [dialog, setDialog] = useState(false);

  const handleFilter = () => {
    let newProductsArr = products.filter((product) => product.kategori === productsFilter)
    console.log(newProductsArr)
    setProductsView(newProductsArr)
    setDialog(false)
  }

  const handleSort = () => {
    // console.log(productsSort)
    // console.log("products:", products)
    setProductsView(products)
    // console.log("productsView:", productsView)
    if(productsSort == "nama") {
      productsView.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0));
    } else if(productsSort == "harga") {
      productsView.sort((a,b) => (a.harga > b.harga) ? 1 : ((b.harga > a.harga) ? -1 : 0));
    }
    // console.log(productsView.sort((a,b) => (a.nama > b.nama) ? 1 : ((b.nama > a.nama) ? -1 : 0)))
    setDialog(false)
  }

  return (
    <div className="ProductPage">
      <h1>Products</h1>

      <div className="SearchBar">
        <SearchBarComponent />
      </div>

      <div>
        <Button variant="outlined" onClick={()=>setDialog(true)}>
          Filter
        </Button>
        <Dialog open={dialog} onClose={()=>setDialog(false)}>
          <DialogTitle>FILTER</DialogTitle>
          <Select
            native
            variant="outlined"
            value={productsFilter}
            inputProps={{
                name: 'Category',
                id: 'filled-age-native-simple',
            }}
            onChange={(e) => setProductsFilter(e.target.value)}
          >
            <option aria-label="CATEGORY" value="CATEGORY" >Category</option>
            <option value={'Generik'}>GENERIK</option>
            <option value={'Paten'}>PATEN</option>
          </Select>
          
          <DialogActions>
            <Button onClick={()=>setDialog(false)}>Cancel</Button>
            <Button onClick={()=>handleFilter()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Button variant="outlined" onClick={()=>setDialog(true)}>
          Sort
        </Button>
        <Dialog open={dialog} onClose={()=>setDialog(false)}>
          <DialogTitle>SORT</DialogTitle>
          <Select
            native
            variant="outlined"
            value={productsSort}
            inputProps={{
                name: 'Category',
                id: 'filled-age-native-simple',
            }}
            onChange={(e) => setProductsSort(e.target.value)}
          >
            <option aria-label="SORT BY" value="default">Sort by</option>
            <option value={'nama'}>NAMA</option>
            <option value={'harga'}>HARGA</option>
          </Select>
          
          <DialogActions>
            <Button onClick={()=>setDialog(false)}>Cancel</Button>
            <Button onClick={()=>handleSort()}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
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
                    {/* <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {product.deskripsi}
                    </Typography> */}
                  </CardContent>

                  <CardContent>
                    <strong>Rp. {product.harga}</strong>
                  </CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Stok : {product.stok}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Kategori : {product.kategori}
                  </Typography>
                </CardActionArea>
                <CardActions>
                  <ButtonComponent
                    title={"Add To Cart"}
                    onClick={() => onsubmit()}
                  />
                </CardActions>
              </Card>
            </div>
          );
        })}

        {/* {JSON.stringify(products)} */}
      </div>
    </div>
  );
}
