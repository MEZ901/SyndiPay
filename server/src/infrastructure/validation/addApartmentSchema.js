import Joi from "joi";

const addApartmentSchema = Joi.object({
  apartmentNumber: Joi.string().required(),
  syndic: Joi.string().required(),
  currentResident: Joi.string(),
});

export default addApartmentSchema;
