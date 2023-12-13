import Joi from "joi";

const addResidentSchema = Joi.object({
  name: Joi.string().required(),
  contactInfo: Joi.string(),
  apartment: Joi.string().required(),
  isOwner: Joi.boolean(),
});

export default addResidentSchema;
