import * as yup from "yup";

const addResidentSchema = yup.object().shape({
  name: yup.string().required(),
  contactInfo: yup.string().nullable(),
  isOwner: yup.boolean().required(),
});

export default addResidentSchema;
