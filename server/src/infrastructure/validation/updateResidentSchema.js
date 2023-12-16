import Joi from "joi";

const updateResidentSchema = Joi.object({
  name: Joi.string(),
  contactInfo: Joi.string(),
  isOwner: Joi.boolean(),
}).min(1);

export default updateResidentSchema;
