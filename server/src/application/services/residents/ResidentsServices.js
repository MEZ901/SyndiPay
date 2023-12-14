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
}

export default ResidentsServices;
