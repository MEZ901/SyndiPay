import ClientError from "../../../infrastructure/exceptions/ClientError.js";
import NotFoundError from "../../../infrastructure/exceptions/NotFoundError.js";
import validateData from "../../../infrastructure/helpers/validateData.js";

class ApartmentsServices {
  constructor({ apartmentRepository }) {
    this.apartmentRepository = apartmentRepository;
  }

  validateAddApartmentInputs = async (data) => {
    await Promise.all([
      validateData(data, "addApartment"),
      this.validateApartmentNumberUnique(data.apartmentNumber),
      this.validateIfResidentExists(data.currentResident),
    ]);
  };

  validateUpdateApartmentInputs = async (data) => {
    await Promise.all([
      validateData(data, "updateApartment"),
      this.validateApartmentNumberUnique(data.apartmentNumber),
      this.validateIfResidentExists(data.currentResident),
    ]);
  };

  validateApartmentNumberUnique = async (apartmentNumber) => {
    const apartment = await this.apartmentRepository.findByApartmentNumber(
      apartmentNumber
    );
    if (apartment) {
      throw new ClientError("Apartment number already exists");
    }
  };

  validateIfResidentExists = async (residentId) => {
    const resident = await this.apartmentRepository.findResidentById(
      residentId
    );
    if (!resident) {
      throw new NotFoundError("Resident does not exist");
    }
  };

  createApartment = async (data) => {
    const apartment = await this.apartmentRepository.create(data);
    return apartment;
  };
}

export default ApartmentsServices;
