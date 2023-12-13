class DeleteApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  softDelete = async (id) => {};

  forceDelete = async (id) => {};
}

export default DeleteApartmentUseCase;
