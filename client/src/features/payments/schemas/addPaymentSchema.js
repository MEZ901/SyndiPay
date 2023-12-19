import * as Yup from "yup";

const addPaymentSchema = Yup.object().shape({
  apartment: Yup.string().required(),
  resident: Yup.string().required(),
  amount: Yup.number().required(),
  paymentDate: Yup.date(),
  paymentDuration: Yup.string().oneOf([
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ]),
  paymentMethod: Yup.string().oneOf(["cash", "check", "bankTransfer"]),
});

export default addPaymentSchema;
