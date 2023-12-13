import Joi from "joi";

const updateApartmentSchema = Joi.object({
  apartmentNumber: Joi.string(),
  syndic: Joi.string(),
  currentResident: Joi.string(),
  previousResidents: Joi.array().items(Joi.string()),
}).min(1);

export default updateApartmentSchema;
