import * as yup from "yup";

const loginSchema = yup.object().shape({
  emailOrUserName: yup.string().required("Username or email is required"),
  password: yup.string().min(6).required("Password is required"),
});

export default loginSchema;
