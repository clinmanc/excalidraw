// material
import { Container } from "@mui/material";
// components
import Page from "../components/Page";
import { ProductList } from "../components/_dashboard/products";
//
import PRODUCTS from "../_mocks_/products";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  return (
    <Page>
      <Container>
        <ProductList products={PRODUCTS} />
      </Container>
    </Page>
  );
}
