class ResidentsServices {
  constructor({ residentRepository }) {
    this.residentRepository = residentRepository;
  }

  getResidentById = async (residentId) => {
    const resident = await this.residentRepository.findById(residentId);
    return resident;
  };
}

export default ResidentsServices;
