class UpdateApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  execute = async (id, apartment) => {};
}

export default UpdateApartmentUseCase;
