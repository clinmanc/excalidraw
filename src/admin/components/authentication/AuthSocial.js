// material
import * as React from 'react';
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    setInterval(handleClose, 3000);
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}>
          <Box
            component="img"
            src={"/static/loginwx.png"}
            color="#1C9CEA"
            height={24}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}>
          <Box
            component="img"
            src={"/static/loginfs.png"}
            color="#1C9CEA"
            height={24}
          />
        </Button>

        {/*<Button fullWidth size="large" color="inherit" variant="outlined">*/}
        {/*  <Icon icon={twitterFill} color="#1C9CEA" height={24} />*/}
        {/*</Button>*/}
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          或
        </Typography>
      </Divider>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message="功能正在开发中"
        key={vertical + horizontal}
      />
    </>
  );
}
