import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFormik } from "formik";
import registerSchema from "../schemas/registerSchema";
import { useRegisterMutation } from "../redux/authApiSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { encryptData } from "../../../utils/helpers";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";

const SignUp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (data) => {
        try {
          const { user } = await register(data).unwrap();

          dispatch(setCredentials({ ...user }));

          const encryptedUser = encryptData(user);
          localStorage.setItem("user", encryptedUser);

          navigate("/");
        } catch (error) {
          setError(error?.data?.message || "register failed");
        }
      },
    });

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
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
            Sign up
          </Typography>
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
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.userName}
              name="userName"
              error={!!touched.userName && !!errors.userName}
              helperText={touched.userName && errors.userName}
              sx={{ gridColumn: "span 16" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
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
            <TextField
              fullWidth
              variant="filled"
              type="password"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={!!touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
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
              <Link to="/" style={{ color: "white" }}>
                Already have an account? Sign in
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
              Sign up
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
