class DeleteResidentUseCase {
  constructor({ residentsServices }) {
    this.residentsServices = residentsServices;
  }

  softDelete = async (id) => {
    const deletedResident = await this.residentsServices.softDeleteResident(id);

    return {
      status: 200,
      data: {
        message: `Resident ${deletedResident.name} has been soft deleted successfully`,
      },
    };
  };

  forceDelete = async (id) => {
    const deletedResident = await this.residentsServices.forceDeleteResident(
      id
    );

    return {
      status: 200,
      data: {
        message: `Resident ${deletedResident.name} has been deleted permanently`,
      },
    };
  };
}

export default DeleteResidentUseCase;
