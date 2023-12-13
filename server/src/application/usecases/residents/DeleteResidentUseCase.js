class DeleteResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  softDelete = async (id) => {};

  forceDelete = async (id) => {};
}

export default DeleteResidentUseCase;
