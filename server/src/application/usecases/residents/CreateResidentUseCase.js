class CreateResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  execute = async (resident) => {
    await this.residentsServices.validateAddResidentInputs(resident);

    const createdResident = await this.residentsServices.createResident(
      resident
    );

    return {
      status: 200,
      data: createdResident,
    };
  };
}

export default CreateResidentUseCase;
