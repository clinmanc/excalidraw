import React, { FC } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import styles from "./styles.module.scss";
import { secondaryListItems } from "./listitems";
import RecipeReviewCard from "./card";
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const Home: FC = () => {
  const [open] = React.useState(true);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box className={styles.list} sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open}>
          <List component="nav">
            {/*{mainListItems}*/}
            {/*<Divider sx={{ my: 1 }} />*/}
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <RecipeReviewCard></RecipeReviewCard>
              </Grid>
              {/* Recent Orders */}
              {/*<Grid item xs={12}>*/}
              {/*  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
              {/*    /!*<Orders />*!/*/}
              {/*  </Paper>*/}
              {/*</Grid>*/}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
