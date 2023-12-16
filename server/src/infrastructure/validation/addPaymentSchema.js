import Joi from "joi";

const addPaymentSchema = Joi.object({
  apartment: Joi.string().required(),
  resident: Joi.string().required(),
  amount: Joi.number().required(),
  paymentDate: Joi.date(),
  paymentDuration: Joi.string().valid(
    "1 month",
    "3 months",
    "6 months",
    "1 year"
  ),
  paymentMethod: Joi.string().valid("cash", "check", "bankTransfer"),
});

export default addPaymentSchema;
