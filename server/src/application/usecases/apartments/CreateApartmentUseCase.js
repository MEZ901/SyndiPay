class CreateApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  execute = async (apartment) => {
    await this.apartmentsServices.validateAddApartmentInputs(apartment);

    const createdApartment = await this.apartmentsServices.createApartment(
      apartment
    );

    return {
      status: 200,
      data: createdApartment,
    };
  };
}

export default CreateApartmentUseCase;
