import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonComponent from "../Components/ButtonComponent";
import { convertToRupiah } from "../helpers/convertToRupiah";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Store/Actions/productsAction";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    padding: 10,
    margin: 30,
    height: "fit-content",
  },
  media: {
    height: 120,
  },
});

export default function CardComponent(props) {
  const history = useHistory();
  const classes = useStyles();
  const auth = useSelector(state => state.authReducer)

  // function getCartTotal(){
  //   return cart.reduce((sum, {quantity}) => sum + quantity, 0)
  // }

  function onSubmit() {
    if(!auth.isLogin){
      alert('Harap login terlebih dahulu')
      history.push("/login")
      return
    }
    let data = {
      id: props.id,
      nama: props.nama,
      harga: props.harga,
      foto_produk: props.foto_produk,
      stock: props.stock,
      deskripsi: props.deskripsi,
      quantity: 1,
    };
    let getData = JSON.parse(localStorage.getItem("cart")) || [];
    getData.push(data);
    localStorage.setItem("cart", JSON.stringify(getData));
  }

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={()=> history.push(`/product-detail/${props.id}`)}>
        <CardMedia className={classes.media} image={props.foto_produk} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {props.nama}
          </Typography>
        </CardContent>
        <CardContent>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Deskripsi Produk</Accordion.Header>
              <Accordion.Body>{props.deskripsi}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </CardContent>

        <CardContent>
          <strong>{convertToRupiah(props.harga)}</strong>
        </CardContent>
        <CardContent>
            {props.stok}

        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <button onClick={onSubmit}>Add to cart</button> */}
        <ButtonComponent title={"Add To Cart"} onSubmit={() => onSubmit()} />
      </CardActions>
    </Card>
  );
}
