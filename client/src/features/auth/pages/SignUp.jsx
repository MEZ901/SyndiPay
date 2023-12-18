import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

const SignUp = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Username"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // value={values.username}
            name="username"
            // error={!!touched.username && !!errors.username}
            // helperText={touched.username && errors.username}
            sx={{ gridColumn: "span 16" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // value={values.email}
            name="email"
            // error={!!touched.email && !!errors.email}
            // helperText={touched.email && errors.email}
            sx={{ gridColumn: "span 16" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Password"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // value={values.password}
            name="password"
            // error={!!touched.password && !!errors.password}
            // helperText={touched.password && errors.password}
            sx={{ gridColumn: "span 16" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="Confirm Password"
            // onBlur={handleBlur}
            // onChange={handleChange}
            // value={values.confirmPassword}
            name="confirmPassword"
            // error={!!touched.confirmPassword && !!errors.confirmPassword}
            // helperText={touched.confirmPassword && errors.confirmPassword}
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
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ width: "100%" }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;