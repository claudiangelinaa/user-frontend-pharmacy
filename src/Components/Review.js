import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { convertToRupiah } from "../helpers/convertToRupiah";
import { useHistory } from "react-router";

const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

export default function Review() {
  const history = useHistory();
  const [cartTotalPrice, setcartTotalPrice] = useState(null);
  const [checkOutProduct, setcheckOutProduct] = useState([]);
  const checkoutData = JSON.parse(localStorage.getItem("checkout") || "[]");
  const address = JSON.parse(localStorage.getItem("address"));

  function totalPriceProduct() {
    setcheckOutProduct(checkoutData);

    let sums = checkoutData.reduce(
      (sum, i) => (sum += i.harga * i.quantity),
      0
    );
    setcartTotalPrice(sums);
  }

  useEffect(() => {
    totalPriceProduct();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {checkOutProduct.map((product) => (
          <ListItem key={product.nama} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.nama} secondary={product.dekripsi} />
            <Typography variant="body2">
              {convertToRupiah(product.harga)} x {`${product.quantity} pcs`}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {convertToRupiah(cartTotalPrice)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>Haryo Novianto</Typography>
          <Typography gutterBottom>{address}</Typography>
        </Grid>
        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
