// material
import { Container } from "@mui/material";
import {useState} from "react";
// components
import Page from "../components/Page";
import { ProductList } from "../components/_dashboard/products";
//
import {userPaintings, userRegister} from "../api/manage";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  if (isLoading) {
    userPaintings({
      UserId: sessionStorage.getItem("username"),
    }, (res) => {
      // console.log("userPaintings", res.data)
      setData(res.data);
      setLoading(false);
    }, (err) => {
      console.log("userPaintings", err)
    })
  }

  if (isLoading) {
    return (<Page>
        <Container>
          <div className="App">Loading...</div>;
        </Container>
      </Page>)
  }

  return (
    <Page>
      <Container>
        <ProductList products={data} />
      </Container>
    </Page>
  );
}
