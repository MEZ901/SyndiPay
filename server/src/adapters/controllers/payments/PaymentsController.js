class PaymentsController {
  constructor({
    createPaymentUseCase,
    readPaymentUseCase,
    updatePaymentUseCase,
    deletePaymentUseCase,
  }) {
    this.createPaymentUseCase = createPaymentUseCase;
    this.readPaymentUseCase = readPaymentUseCase;
    this.updatePaymentUseCase = updatePaymentUseCase;
    this.deletePaymentUseCase = deletePaymentUseCase;
  }

  getAllPayments = async (req, res) => {
    const result = await this.readPaymentUseCase.getAllPayments();
    res.status(result.status).json(result.data);
  };

  getPaymentById = async (req, res) => {
    const { id } = req.params;
    const result = await this.readPaymentUseCase.getOnePayment(id);
    res.status(result.status).json(result.data);
  };

  createPayment = async (req, res) => {
    const {
      apartment,
      resident,
      amount,
      paymentDate,
      paymentDuration,
      paymentMethod,
    } = req.body;

    const paymentData = {
      apartment,
      resident,
      amount,
      ...(paymentDate && { paymentDate }),
      ...(paymentDuration && { paymentDuration }),
      ...(paymentMethod && { paymentMethod }),
    };

    const result = await this.createPaymentUseCase.execute(paymentData);

    res.status(result.status).json(result.data);
  };

  updatePayment = async (req, res) => {
    const { id } = req.params;
    const {
      apartment,
      resident,
      amount,
      paymentDate,
      paymentDuration,
      paymentMethod,
    } = req.body;

    const paymentData = {
      ...(apartment && { apartment }),
      ...(resident && { resident }),
      ...(amount && { amount }),
      ...(paymentDate && { paymentDate }),
      ...(paymentDuration && { paymentDuration }),
      ...(paymentMethod && { paymentMethod }),
    };

    const result = await this.updatePaymentUseCase.execute(id, paymentData);

    res.status(result.status).json(result.data);
  };

  deletePayment = async (req, res) => {
    const { id } = req.params;
    const result = await this.deletePaymentUseCase.softDelete(id);
    res.status(result.status).json(result.data);
  };

  forceDeletePayment = async (req, res) => {
    const { id } = req.params;
    const result = await this.deletePaymentUseCase.forceDelete(id);
    res.status(result.status).json(result.data);
  };
}

export default PaymentsController;
