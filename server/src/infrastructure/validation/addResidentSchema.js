import Joi from "joi";

const addResidentSchema = Joi.object({
  name: Joi.string().required(),
  contactInfo: Joi.string(),
  isOwner: Joi.boolean(),
});

export default addResidentSchema;
