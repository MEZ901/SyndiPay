import Joi from "joi";

const addPaymentSchema = Joi.object({
  apartment: Joi.string().required(),
  resident: Joi.string().required(),
  amount: Joi.number().required(),
  paymentDate: Joi.date(),
  paymentMethod: Joi.string(),
  paymentStatus: Joi.string(),
});

export default addPaymentSchema;
