class UpdateResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  execute = async (id, resident) => {
    await this.residentsServices.validateUpdateResidentInputs(resident);

    const updatedResident = await this.residentsServices.updateResident(
      id,
      resident
    );

    return {
      status: 200,
      data: updatedResident,
    };
  };
}

export default UpdateResidentUseCase;
