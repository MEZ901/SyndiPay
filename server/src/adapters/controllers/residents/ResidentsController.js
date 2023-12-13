class ResidentsController {
  constructor({
    createResidentUseCase,
    readResidentUseCase,
    updateResidentUseCase,
    deleteResidentUseCase,
  }) {
    this.createResidentUseCase = createResidentUseCase;
    this.readResidentUseCase = readResidentUseCase;
    this.updateResidentUseCase = updateResidentUseCase;
    this.deleteResidentUseCase = deleteResidentUseCase;
  }

  getAllResidents = async (req, res) => {
    res.status(200).json({ message: "getAllResidents" });
  };

  getResidentById = async (req, res) => {
    res.status(200).json({ message: "getResidentById" });
  };

  createResident = async (req, res) => {
    res.status(200).json({ message: "createResident" });
  };

  updateResident = async (req, res) => {
    res.status(200).json({ message: "updateResident" });
  };

  deleteResident = async (req, res) => {
    res.status(200).json({ message: "deleteResident" });
  };

  forceDeleteResident = async (req, res) => {
    res.status(200).json({ message: "forceDeleteResident" });
  };
}

export default ResidentsController;
