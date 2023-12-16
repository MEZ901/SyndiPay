import ClientError from "../../../infrastructure/exceptions/ClientError.js";
import validateData from "../../../infrastructure/helpers/validateData.js";

class ResidentsServices {
  constructor({ residentRepository }) {
    this.residentRepository = residentRepository;
  }

  getAllResidents = async () => {
    const residents = await this.residentRepository.find();
    return residents;
  };

  getResidentById = async (residentId) => {
    const resident = await this.residentRepository.findById(residentId);
    return resident;
  };

  validateAddResidentInputs = async (resident) => {
    await Promise.all([
      validateData(resident, "addResident"),
      this.validateResidentNameUnique(resident.name),
    ]);
  };

  validateUpdateResidentInputs = async (resident) => {
    await Promise.all([
      validateData(resident, "updateResident"),
      this.validateResidentNameUnique(resident.name),
    ]);
  };

  validateResidentNameUnique = async (name) => {
    const resident = await this.residentRepository.findByName(name);
    if (resident) {
      throw new ClientError("Resident name already exists");
    }
  };

  createResident = async (resident) => {
    const createdResident = await this.residentRepository.create(resident);
    return createdResident;
  };

  updateResident = async (id, resident) => {
    const updatedResident = await this.residentRepository.update(id, resident);
    return updatedResident;
  };

  softDeleteResident = async (id) => {
    const deletedResident = await this.residentRepository.softDelete(id);
    return deletedResident;
  };

  forceDeleteResident = async (id) => {
    const deletedResident = await this.residentRepository.forceDelete(id);
    return deletedResident;
  };
}

export default ResidentsServices;
