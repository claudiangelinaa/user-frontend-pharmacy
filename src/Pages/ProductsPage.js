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
  const [dialog, setDialog] = useState(false);

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
                value="Category"
                inputProps={{
                    name: 'Category',
                    id: 'filled-age-native-simple',
                }}
            >
              <option aria-label="CATEGORY" value="CATEGORY" >Category</option>
                <option >BATUK DAN FLU</option>
                <option value={20}>DEMAM</option>
                <option value={30}>ANTI NYERI</option>
                <option value={20}>ANTI INFLAMASI</option>
                <option value={30}>ALERGI</option>
                <option value={30}>HIPERTENSI</option>
                <option value={20}>SALURAN KEMIH</option>
              
            </Select>
            
        
        <DialogActions>
          <Button onClick={()=>setDialog(false)}>Cancel</Button>
          <Button >Submit</Button>
        </DialogActions>
      </Dialog>
    </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {products.map((value) => {
          return (
            <div className="Products ProductPage ">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={value.foto_produk}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {value.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {value.deskripsi}
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <strong>Rp. {value.harga}</strong>
                  </CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Stok : {value.stok}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Kategori : {value.kategori}
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
