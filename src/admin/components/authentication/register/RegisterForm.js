import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useFormik, Form, FormikProvider } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import LButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
// material
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {userRegister, verificationCode} from "../../../api/manage";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [countDownSecond, setCountDownSecond] = useState(10);
  const [codeText, setCodeText] = useState("发送验证码");

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
      userRegister({
        Phone: getFieldProps("phone").value,
        Password: getFieldProps("password").value,
        Vcode: getFieldProps("verification").value,
      }, (res) => {
        console.log("userRegister", res)
        navigate("/dashboard", { replace: true });
      }, (err) => {
        console.log("userRegister", err)
      })
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  let showVerification = "none";
  if (getFieldProps("phone").value.length === 11 && errors.phone === undefined) {
    showVerification = "";
  }

  function sendCode() {
    verificationCode({ Phone: getFieldProps("phone").value }, (res) => {
      console.log(getFieldProps("phone").value);
      console.log(res);

      setLoadingC(true)
      let second = countDownSecond;
      setCodeText(second + 's 请等待')
      const countDown = ()=> {
        if( second > 0){
          second--;
          setCountDownSecond( second );
          setCodeText(second + 's 请等待')
        }
        if( second === 0 ){
          setCountDownSecond( 60 );
          setCodeText("发送验证码")
          setLoadingC(false)
          return;
        }
        // let timer = setTimeout( countDown,1000 );
        setTimeout( countDown,1000 );
      };
      setTimeout( countDown,1000 );
    })
  }

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

          <Stack direction="row" display={showVerification}>
            <TextField
              autoComplete="verification"
              type="verification"
              sx={{ m: 1, width: '70%', }}
              label="验证码"
              {...getFieldProps("verification")}
              error={Boolean(touched.verification && errors.verification)}
              helperText={touched.verification && errors.verification}
            />
            {/*<Button >*/}
              <LButton variant="contained" sx={{ m: 1, width: '30%', height: '55px' }} loadingPosition="start"
                onClick={sendCode}
                // endIcon={<SendIcon />}
                loading={loadingC}
              >
                {codeText}
              </LButton>
            {/*</Button>*/}
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
