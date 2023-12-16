import Joi from "joi";

const updatePaymentSchema = Joi.object({
  apartment: Joi.string(),
  resident: Joi.string(),
  amount: Joi.number(),
  paymentDate: Joi.date(),
  paymentDuration: Joi.string().valid(
    "1 month",
    "3 months",
    "6 months",
    "1 year"
  ),
  paymentMethod: Joi.string().valid("cash", "check", "bankTransfer"),
}).min(1);

export default updatePaymentSchema;
