import ClientError from "../../../infrastructure/exceptions/ClientError.js";
import NotFoundError from "../../../infrastructure/exceptions/NotFoundError.js";
import validateData from "../../../infrastructure/helpers/validateData.js";

class ApartmentsServices {
  constructor({ apartmentRepository, residentsServices }) {
    this.apartmentRepository = apartmentRepository;
    this.residentsServices = residentsServices;
  }

  validateAddApartmentInputs = async (data) => {
    await Promise.all([
      validateData(data, "addApartment"),
      this.validateApartmentNumberUnique(data.apartmentNumber),
      data.currentResident &&
        this.validateIfResidentExists(data.currentResident),
    ]);
  };

  validateUpdateApartmentInputs = async (data) => {
    await Promise.all([
      validateData(data, "updateApartment"),
      this.validateApartmentNumberUnique(data.apartmentNumber),
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
    const resident = await this.residentsServices.getResidentById(residentId);
    if (!resident) {
      throw new NotFoundError("Resident does not exist");
    }
  };

  createApartment = async (data) => {
    const apartment = await this.apartmentRepository.create(data);
    return apartment;
  };

  getAllApartments = async () => {
    const apartments = await this.apartmentRepository.find();
    return apartments;
  };

  getApartmentById = async (apartmentId) => {
    const apartment = await this.apartmentRepository.findById(apartmentId);
    return apartment;
  };

  updateApartment = async (apartmentId, data) => {
    const updatedApartment = await this.apartmentRepository.update(
      apartmentId,
      data
    );
    return updatedApartment;
  };

  softDelete = async (apartmentId) => {
    const softDeletedApartment = await this.apartmentRepository.softDelete(
      apartmentId
    );
    return softDeletedApartment;
  };

  forceDelete = async (apartmentId) => {
    const deletedApartment = await this.apartmentRepository.forceDelete(
      apartmentId
    );
    return deletedApartment;
  };
}

export default ApartmentsServices;
