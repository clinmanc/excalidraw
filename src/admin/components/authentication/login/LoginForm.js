import * as Yup from "yup";
import {useState} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import {Icon} from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {IconButton, InputAdornment, Link, Stack, TextField,} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {userLogin, userRegister} from "../../../api/manage";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    phone: Yup.string().required("手机号为空"),
    password: Yup.string().required("密码为空"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      userLogin({
        Phone: getFieldProps("phone").value,
        Password: getFieldProps("password").value,
      }, (res) => {
        console.log("userLogin", res)
        sessionStorage.setItem("username", res.data.username)
        navigate("/dashboard", { replace: true });
      }, (err) => {
        console.log("userLogin", err)
      })
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="手机号"
            label="手机号"
            {...getFieldProps("phone")}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="密码"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link variant="subtitle2" component={RouterLink} to="/register">
            注册账户
          </Link>

          <Link component={RouterLink} variant="subtitle2" to="#">
            忘记密码?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          // loading={isSubmitting}
        >
          登 陆
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
