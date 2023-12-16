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
    const result = await this.readResidentUseCase.getAllResidents();
    res.status(result.status).json(result.data);
  };

  getResidentById = async (req, res) => {
    const { id } = req.params;
    const result = await this.readResidentUseCase.getOneResident(id);
    res.status(result.status).json(result.data);
  };

  createResident = async (req, res) => {
    const { name, contactInfo, isOwner } = req.body;

    const residentData = {
      name,
      ...(contactInfo && { contactInfo }),
      ...(isOwner !== undefined && { isOwner }),
    };

    const result = await this.createResidentUseCase.execute(residentData);

    res.status(result.status).json(result.data);
  };

  updateResident = async (req, res) => {
    const { id } = req.params;
    const { name, contactInfo, isOwner } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(contactInfo && { contactInfo }),
      ...(isOwner !== undefined && { isOwner }),
    };

    const result = await this.updateResidentUseCase.execute(id, updateData);

    res.status(result.status).json(result.data);
  };

  deleteResident = async (req, res) => {
    res.status(200).json({ message: "deleteResident" });
  };

  forceDeleteResident = async (req, res) => {
    res.status(200).json({ message: "forceDeleteResident" });
  };
}

export default ResidentsController;
