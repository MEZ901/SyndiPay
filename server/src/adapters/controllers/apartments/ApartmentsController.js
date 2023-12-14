class ApartmentsController {
  constructor({
    createApartmentUseCase,
    readApartmentUseCase,
    updateApartmentUseCase,
    deleteApartmentUseCase,
  }) {
    this.createApartmentUseCase = createApartmentUseCase;
    this.readApartmentUseCase = readApartmentUseCase;
    this.updateApartmentUseCase = updateApartmentUseCase;
    this.deleteApartmentUseCase = deleteApartmentUseCase;
  }

  getAllApartments = async (req, res) => {
    const result = await this.readApartmentUseCase.getAllApartments();
    res.status(result.status).json(result.data);
  };

  getApartmentById = async (req, res) => {
    const { id } = req.params;
    const result = await this.readApartmentUseCase.getOneApartment(id);
    res.status(result.status).json(result.data);
  };

  createApartment = async (req, res) => {
    const { apartmentNumber, currentResident } = req.body;
    const syndic = req.user.id;

    const result = await this.createApartmentUseCase.execute({
      apartmentNumber,
      syndic,
      currentResident,
    });

    res.status(result.status).json(result.data);
  };

  updateApartment = async (req, res) => {
    const { id } = req.params;
    const { apartmentNumber, currentResident, previousResident } = req.body;

    const updateData = {
      ...(apartmentNumber && { apartmentNumber }),
      ...(currentResident !== undefined && { currentResident }),
      ...(previousResident && { previousResident }),
    };

    const result = await this.updateApartmentUseCase.execute(id, updateData);

    res.status(result.status).json(result.data);
  };

  deleteApartment = async (req, res) => {
    const { id } = req.params;

    const result = await this.deleteApartmentUseCase.softDelete(id);

    res.status(result.status).json(result.data);
  };

  forceDeleteApartment = async (req, res) => {
    const { id } = req.params;

    const result = await this.deleteApartmentUseCase.forceDelete(id);

    res.status(result.status).json(result.data);
  };
}

export default ApartmentsController;
