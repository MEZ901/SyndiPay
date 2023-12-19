import * as yup from "yup";

const emailRule = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const registerSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  email: yup
    .string()
    .matches(emailRule, "Please enter a valid email")
    .required("Email is required"),
  password: yup.string().min(6).required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default registerSchema;
