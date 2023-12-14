class ReadResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  getAllResidents = async () => {
    const residents = await this.residentsServices.getAllResidents();
    return {
      status: 200,
      data: residents,
    };
  };

  getOneResident = async (id) => {
    const resident = await this.residentsServices.getResidentById(id);
    return {
      status: 200,
      data: resident,
    };
  };
}

export default ReadResidentUseCase;
