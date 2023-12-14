class ReadApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  getAllApartments = async () => {
    const apartments = await this.apartmentsServices.getAllApartments();
    return {
      status: 200,
      data: apartments,
    };
  };

  getOneApartment = async (id) => {
    const apartment = await this.apartmentsServices.getApartmentById(id);
    return {
      status: 200,
      data: apartment,
    };
  };
}

export default ReadApartmentUseCase;
