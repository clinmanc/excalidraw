// material
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Box
            component="img"
            src={"/static/loginwx.png"}
            color="#1C9CEA"
            height={24}
          />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
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
    </>
  );
}
