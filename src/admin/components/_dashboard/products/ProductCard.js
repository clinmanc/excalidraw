import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import { Box, Card, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
//
import Label from "../../Label";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { author, thumbnail, status } = product;

  console.log("ShopProductCard", product);
  return (
    <Card>
      <Box sx={{ pt: "100%", position: "relative" }}>
        {status && (
          <Label
            variant="filled"
            color={(status === "sale" && "error") || "info"}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: "absolute",
              textTransform: "uppercase",
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle
          alt={author}
          src={thumbnail}
        />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {"作品1"}
          </Typography>
          {"2022-2-2"}
        </Link>
        {/*<Stack direction="row" alignItems="center" justifyContent="space-between">*/}
        {/*  <ColorPreview colors={colors} />*/}
        {/*  <Typography variant="subtitle1">*/}
        {/*    <Typography*/}
        {/*      component="span"*/}
        {/*      variant="body1"*/}
        {/*      sx={{*/}
        {/*        color: 'text.disabled',*/}
        {/*        textDecoration: 'line-through'*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {priceSale && fCurrency(priceSale)}*/}
        {/*    </Typography>*/}
        {/*    &nbsp;*/}
        {/*    {fCurrency(price)}*/}
        {/*  </Typography>*/}
        {/*</Stack>*/}
      </Stack>
    </Card>
  );
}
