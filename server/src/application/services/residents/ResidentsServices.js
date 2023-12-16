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
}

export default ResidentsServices;
