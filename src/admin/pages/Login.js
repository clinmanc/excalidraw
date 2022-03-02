import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Card, Container, Link, Typography } from "@mui/material";
// layouts
import AuthLayout from "../layouts/AuthLayout";
// components
import Page from "../components/Page";
import { MHidden } from "../components/@material-extend";
import { LoginForm } from "../components/authentication/login";
import AuthSocial from "../components/authentication/AuthSocial";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login">
      <AuthLayout>
        没有账户? &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          前往注册
        </Link>
      </AuthLayout>

      <MHidden width="mdDown" name={"other"}>
        <SectionStyle>
          {/*<Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>*/}
          {/*  欢迎回来*/}
          {/*</Typography>*/}
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          {/*<Stack sx={{ mb: 5 }}>*/}
          {/*  */}
          {/*  /!*<Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>*!/*/}
          {/*</Stack>*/}
          <Typography variant="h4" gutterBottom>
            选择登陆方式
          </Typography>
          <AuthSocial />

          <LoginForm />

        </ContentStyle>
        <Link href={"https://beian.miit.gov.cn"}>浙ICP备19040008号</Link>
      </Container>
    </RootStyle>
  );
}
