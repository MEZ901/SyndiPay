class CreateResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  execute = async (resident) => {};
}

export default CreateResidentUseCase;
