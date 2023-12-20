class ReadApartmentUseCase {
  constructor({ apartmentsServices }) {
    this.apartmentsServices = apartmentsServices;
  }

  getAllApartments = async (syndic) => {
    const apartments = await this.apartmentsServices.getAllApartments(syndic);
    return {
      status: 200,
      data: apartments,
    };
  };

  getOneApartment = async (id, syndic) => {
    const apartment = await this.apartmentsServices.getApartmentById(
      id,
      syndic
    );
    return {
      status: 200,
      data: apartment,
    };
  };
}

export default ReadApartmentUseCase;
