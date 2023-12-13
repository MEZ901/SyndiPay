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
    res.status(200).json({ message: "get all apartments" });
  };

  getApartmentById = async (req, res) => {
    res.status(200).json({ message: "get apartment by id" });
  };

  createApartment = async (req, res) => {
    const { apartmentNumber, currentResident } = req.body;
    const syndic = req.user._id;

    const result = await this.createApartmentUseCase.execute({
      apartmentNumber,
      syndic,
      currentResident,
    });

    res.status(result.status).json(result.data);
  };

  updateApartment = async (req, res) => {
    res.status(200).json({ message: "update apartment" });
  };

  deleteApartment = async (req, res) => {
    res.status(200).json({ message: "soft delete apartment" });
  };

  forceDeleteApartment = async (req, res) => {
    res.status(200).json({ message: "force delete apartment" });
  };
}

export default ApartmentsController;
