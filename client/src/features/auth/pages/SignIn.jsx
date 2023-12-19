import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import loginSchema from "../schemas/loginSchema";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/authApiSlice";
import { setCredentials } from "../redux/authSlice";
import { encryptData } from "../../../utils/helpers";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const SignIn = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [login, { isLoading }] = useLoginMutation();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        emailOrUserName: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (data) => {
        try {
          const { user } = await login(data).unwrap();

          dispatch(setCredentials({ ...user }));

          const encryptedUser = encryptData(user);
          localStorage.setItem("user", encryptedUser);
        } catch (error) {
          setError(error?.data?.message || "Login failed");
        }
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              marginTop: 4,
            }}
          >
            {error && (
              <Alert severity="error" sx={{ gridColumn: "span 16" }}>
                {error}
              </Alert>
            )}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email or username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.emailOrUserName}
              name="emailOrUserName"
              error={!!touched.emailOrUserName && !!errors.emailOrUserName}
              helperText={touched.emailOrUserName && errors.emailOrUserName}
              sx={{ gridColumn: "span 16" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 16" }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="20px"
            sx={{ width: "100%" }}
          >
            <Box>
              <Link href="#" style={{ color: "white" }}>
                Forgot password?
              </Link>
            </Box>
            <Box>
              <Link to="signup" style={{ color: "white" }}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="end"
            mt="20px"
            sx={{ width: "100%" }}
          >
            <LoadingButton
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ width: "100%" }}
              loading={isLoading}
            >
              Sign in
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
