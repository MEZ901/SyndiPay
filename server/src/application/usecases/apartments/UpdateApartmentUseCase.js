class UpdateApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  execute = async (id, apartment) => {
    await this.apartmentsServices.validateUpdateApartmentInputs(apartment);

    const updatedApartment = await this.apartmentsServices.updateApartment(
      id,
      apartment
    );

    return {
      status: 200,
      data: updatedApartment,
    };
  };
}

export default UpdateApartmentUseCase;
