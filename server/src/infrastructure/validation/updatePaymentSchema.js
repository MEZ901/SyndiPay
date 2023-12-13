import Joi from "joi";

const updatePaymentSchema = Joi.object({
  apartment: Joi.string(),
  resident: Joi.string(),
  amount: Joi.number(),
  paymentDate: Joi.date(),
  paymentMethod: Joi.string(),
  paymentStatus: Joi.string(),
}).min(1);

export default updatePaymentSchema;
