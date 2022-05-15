import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";
import { Link as RouterLink } from "react-router-dom";

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, ...other }) {
  // const toEd = (product) => {
  //   console.log(product);
  // };
  // console.log("ProductList", products);
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid
          component={RouterLink}
          to={`/dashboard/ed/${product.id}`}
          key={product.id}
          item
          xs={12}
          sm={6}
          md={3}
        >
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
