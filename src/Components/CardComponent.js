import React, { useState } from "react";
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
  const history = useHistory()

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Amoxicilin",
      price: 250000,
      img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//100/MTA-2939670/kimia-farma_amoxicillin---1-box-10-strip-x10-tablet-_full03.jpg",
    },
    {
      id: 2,
      name: "Amphetamine",
      price: 200000,
      img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEBUSExIQFRUQExUSGBYXEhASEhYSFRIWFhURFhcYHSggGB0lHRUVIjEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0PDysZFRktKysrKystKysrKysrKysrKys3KystKystLSsrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcBAv/EADwQAAIBAgMGBAQFAQYHAAAAAAABAgMRBAUhBhIxQVFhcYGRoSIyscETQlKS0QcWI1NigvAUQ3KisuHx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaWOzSlS0lK7/StZf+vMDdBWK21Mr/AA0lbvN39lob+UbQU6z3GnCdr7raaa57r5+zAmAa1XHU48ZJeZ80swpy+WSfmBtg+FI8qSsm+ib9EBhxmYU6fzS16JNv2NOjtDh27OThf9StH14LzNHE0N5X4t63IbFYYqVfLnjqLqc5lmmIoU92D3orgnduPZduxES2lxDfzsiuuqR7c55ke1MrqNR+ZeMJilNXA27np8oAfQPD0AAAAAAAAAAAAAAGvjMbCkrzlbouMn4IY2u4x04vRdu5U8dSk22223zYGzjtoZyuoRUY93LefmmrEUnGfy3jPjut33urjLn4PUw1XY069fva2t+FmuD7BGepUsRePxW78adnHVNaO/YxZjmycm4rjr2vzsU/Mc6dSf4dK9STdm1ql1S6vw4BU1Vx856ynJ+bLNsZhKsp795bvnr3NLZLZGc7Tq6LjY6jgMBGnGySSQGzQjZGSUbprqrGKniqbe6pwb6KUW/S5nAr+tOThLlwfbkzDi8O3w0XuTeY4VVI24SXB/Z9iEw9dqTpz0a0KiIxOFKxm2XuN5RXijoGJwt9UQuOw2juBRqdYtuze0G61CT8GVPMqW5U04Mx0qpFdvwmKUlobSKPsZjZyjZ300LtTA+z08PQAAAAAAAAAAAAADQzZtKL5Ju/naxC47GQtwt7lnqQTTTV0+RAZhs3v33KzjflKG/6NNP1uVFKzTMop/Cm/ZFRznP4QupS3pfojq/Pp5l4x/8ATrEVHZ4uEYv9MGpfXQ2cl/pXhKMlKbdWS1+LhfrYiuWZflONzB8HTpPkr2a7vjL2R1LZPYKlQSbjd9XxLnDD0aMeEYpdvZEPmGbyl8MPhj/3PxfICSxOIjQjZRcn2VorxZX8bjp1Pmlp+laRXka2+07xk4vtwfiuD8xOspRbsozhrJL5Wr2349NbXXcqNevFWNrD7WyoUmqrclF2i+Mv+l9SJxeLSWrKpnmOvaPe9u3VkVZ8d/UKbfwR07s+cm2kqYmpaUdVpdfQq+V5VUrySjF268jouTZPDCw+Xelx/wDrAk6OPcVZq/jo0QWcZuknaPuS+IzGMladFNLmpyjJeDRC4rI8JWfxYnGU0/yv8O3hvqP1ZUUPMsZv1OKv0XLsT+z2zlWvaTi4x6tcSy5dkOV4dpq02tbznvefQtOEzig9ISj5WIpk2TxoxSS4EukYKeJi+DRmUgPsHzc9uB6Dw9AAAAAYsU7Ql4AR+PzlQdox32ud7R9eZHS2jq/4cPWRlr4W6uaUsMWJWx/aefOjH97X2PuntSnFS/Blxaa3lytwdteJHV8N8L8H9D5oYS1OK7X/AHNy+4Estpo86c1+1/c9/tJS57y8V/BEvCmricPoQWNZ9Sf5l6o+45xTf5kcn2jp7qU4tp727o+Ks39ivzxlVcJy9QruOLTqfFfTl0sRGIpWNfY7O/xMPGzTcYqMk+Kklr68fMyZvmFk/h9yo0cRWsQ2JzS3yvXVX5W+5F5nmkpS3bTnJ6qnTi5yffdWtu70NTBbP43GVNxwdGH6ZaSfjzfgtCK18fnTlLcpf3k3pfjFPy4+CJvZjYirVl+JXb11s+L8f4Redmdg6OGSbScucna/l0LbSpRirKwEblOS06UUoxSsY91Tvbq/qTW8iv5nhJ05OcLuL101cezXTuXE1hr4LsR2LoKKbZKYfM7r4kpLqjNKnTquOq01s+vIIp9fJo1FepHjwWqa76a/79ImvkE4O9KpJdm/udFrYEj6+DC1T8Hn2IoO0727/wAlryzbCErKWjIvNMKt13RUpR3ZWIrs2EzOE1o0b0ZXOM4HH1INbsmdK2dxcpwTl0Anj08R9AAAAPmpC6a6qx9ACsY6M6WjbS6/l9eBo/8AFvqn6fYupqVsroT+alSb67kb+pakVV4p9F7n28Y+iJ2ezuGf/Lt4TqR+jPh7NYe1kqit0q1W/dsUiDeM7e5pY7HaP4V6lklsvS/xMQv9cfvE16uxdCXzVcS10/EUf/GKBHJM9xu/NQ4yvdpflRJZBslWxFpOLjB82rX8DqOXbIYKjrChG/WV5O/W7JuEElZJIiq1k2yVKjG1vF8/U+c52Vw8ouU6uIiv0xqJX7Xab9y0SkkrvgtStZnmKk/lbS0XxbunXgwIHC4CjQi4UYKKbu3xlJ/qnJ6yfiYcVY3qtWm+coP/ADfFH9y1XmiHzKbi7Pxve6a6plRu/wBtJ0aSjUvJ8Ivm10k+dupCYrbutJ/DZe5W84xSlNdFe3h1/wB9DBh4bzSS4kV0XZfaWtWlaRfaEropux2TbkU2tXqXelCyA08TlVOett2T/NH4X58n5pkdWyepH5XGa/bL0ej9UWGx6BVoYqcHuu6f6ZJp+j+x91cddax9Cx1aMZK0oqS6NJr3I3E5DTl8spw8GpL0lf2LUik5/j0ouyd++hT6N5ydtW3y+h03E7DRqP8AvMRUa6RhCPuSmU7LYbD/ACQu1zlqyKqOz2yk5WnUVlxt/Jf8Hg1CNkbKjY9AAAAAAAAAAAAAAAAAAACHzzFabi/1fZFbrSLBWpb933f1IbHUrJlRDYytZFZzjMbR3b6K78E+Xmb+cYqz79CmY2u5ystUn6vqRWOM3KTb5/ToXnYzJHOSnJaciJ2X2dnWkm092/HqdhyfK40oJJcANrA4ZRikbiQSPoDw9AAAAAAAAAAAAAAAAAAAAAAAAAAAACDzLDyg3KN9163XLxKtm+Pai/jj6xOimCrg6cneVOnJ9XCLfugkcIr4etXlu0oTlvPWVn6L+S2bM/06atOvp/l/k6fToxjpGMV4JI+wrRwOWQpK0UlY3Uj0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=",
    },
    {
      id: 3,
      name: "Paracetamol",
      price: 230000,
      img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//106/MTA-2939677/kimia-farma_kimia-farma-paracetamol-500--1-box-10-strip-x-10-tablet-_full02.jpg",
    },
    {
      id: 4,
      name: "Metronidazole",
      price: 450000,
      img: "https://www.novapharin.co.id/data/plist_pic/36.jpg",
    },
  ]);

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
