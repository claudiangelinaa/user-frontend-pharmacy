import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import { fetchProduct } from "../Store/Actions/productsAction";
import Cookies from 'js-cookie'

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
  const [cart, setCart] = useState({
    product: [],
  });

  function productToCart() {
    setCart((prevState) => ({
      ...prevState,
      product: prevState.product.concat(props),
    }));
    Cookies.set("cart", JSON.stringify(cart.product), { expires: 14 } )
  }

  // function getCartTotal(){
  //   return cart.reduce((sum, {quantity}) => sum + quantity, 0)
  // }

  function onSubmit() {
    productToCart();
  }

  useEffect(() => {
    productToCart();
  }, []);

  return (
    <Card className={classes.root}>
      {console.log(props)}
      <CardActionArea>
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
      </CardActionArea>
      <CardActions>
        {/* <button onClick={onSubmit}>Add to cart</button> */}
        <ButtonComponent title={"Add To Cart"} onSubmit={() => onSubmit()} />
      </CardActions>
    </Card>
  );
}
