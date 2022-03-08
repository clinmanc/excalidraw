import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('First name required'),
    // lastName: Yup.string().min(2, '密码长度太短').max(50, '密码长度太长').required('Last name required'),
    phone: Yup.string().length(11, '手机号格式不对').required("手机号为空"),
    verification: Yup.string().length(6, '验证码格式不对').required("验证码为空"),
    password: Yup.string().required("密码为空"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      verification:"",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate("/dashboard", { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/*<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>*/}
          {/*  <TextField*/}
          {/*    fullWidth*/}
          {/*    label="First name"*/}
          {/*    {...getFieldProps('firstName')}*/}
          {/*    error={Boolean(touched.firstName && errors.firstName)}*/}
          {/*    helperText={touched.firstName && errors.firstName}*/}
          {/*  />*/}

          {/*  <TextField*/}
          {/*    fullWidth*/}
          {/*    label="Last name"*/}
          {/*    {...getFieldProps('lastName')}*/}
          {/*    error={Boolean(touched.lastName && errors.lastName)}*/}
          {/*    helperText={touched.lastName && errors.lastName}*/}
          {/*  />*/}
          {/*</Stack>*/}

          <TextField
            fullWidth
            autoComplete="username"
            type="phone"
            label="手机号"
            {...getFieldProps("phone")}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <Stack direction="row">
            <TextField
              autoComplete="verification"
              type="verification"
              sx={{ m: 1, width: '70%', }}
              label="验证码"
              {...getFieldProps("verification")}
              error={Boolean(touched.verification && errors.verification)}
              helperText={touched.verification && errors.verification}
            />
            <Button variant="contained" sx={{ m: 1, width: '30%', height: '55px' }}>
              发送验证码
            </Button>
          </Stack>

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="密码"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            注 册
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
