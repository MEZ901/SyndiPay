import * as yup from "yup";

const addApartmentSchema = yup.object().shape({
  apartmentNumber: yup.string().required(),
  currentResident: yup.string().nullable(),
});

export default addApartmentSchema;
