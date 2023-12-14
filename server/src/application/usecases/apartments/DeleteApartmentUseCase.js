class DeleteApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  softDelete = async (id) => {
    const result = await this.apartmentsServices.softDelete(id);

    return {
      status: 200,
      data: {
        message: `The apartment ${result.apartmentNumber} has been deleted successfully`,
      },
    };
  };

  forceDelete = async (id) => {
    const result = await this.apartmentsServices.forceDelete(id);

    return {
      status: 200,
      data: {
        message: `The apartment ${result.apartmentNumber} has been deleted permanently`,
      },
    };
  };
}

export default DeleteApartmentUseCase;
