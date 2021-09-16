import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonComponent from "../Components/ButtonComponent";
import { useHistory } from "react-router";
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 30,
  },
  media: {
    height: 120,
  },
});

export default function CardComponent() {
  useEffect(()=>{
    axios.get("http://localhost:5001")
    .then((res)=>{
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err)
    })
  })
  const history = useHistory()

  const [products, setProducts] = useState([])


  const classes = useStyles();

  onsubmit = () => {
    history.push("/Cart")
  }

  return (
    <>
      {products.map((value) => {
        return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia className={classes.media} image={value.img} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {value.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  lorem ipsum dolores test drug examples
                </Typography>
              </CardContent>

              <CardContent>
                <strong>
                  Rp. {new Intl.NumberFormat("id").format(value.price)}
                </strong>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <ButtonComponent title={"Add To Cart"} onClick={()=> onsubmit()} />
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
