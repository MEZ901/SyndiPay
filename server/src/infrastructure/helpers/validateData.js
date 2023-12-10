import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import NotFoundError from "../exceptions/NotFoundError.js";
import ClientError from "../exceptions/ClientError.js";

const validateData = async (data, schemaName) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const schemaPath = path.join(
    __dirname,
    "..",
    "validation",
    `${schemaName}Schema.js`
  );

  if (!fs.existsSync(schemaPath)) {
    throw new NotFoundError(`Schema "${schemaName}" not found`);
  }
  const schema = await import(schemaPath);
  const { error } = schema.default.validate(data);

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    throw new ClientError(errorMessages[0]);
  }
};

export default validateData;
