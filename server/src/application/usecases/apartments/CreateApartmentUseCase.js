class CreateApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  execute = async (apartment) => {};
}

export default CreateApartmentUseCase;
