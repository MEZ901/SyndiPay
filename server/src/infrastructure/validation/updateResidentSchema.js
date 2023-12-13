import Joi from "joi";

const updateResidentSchema = Joi.object({
  name: Joi.string(),
  contactInfo: Joi.string(),
  apartment: Joi.string(),
  isOwner: Joi.boolean(),
}).min(1);
