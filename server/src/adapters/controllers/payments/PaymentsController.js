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
    res.status(200).json({ message: "getAllPayments" });
  };

  getPaymentById = async (req, res) => {
    res.status(200).json({ message: "getPaymentById" });
  };

  createPayment = async (req, res) => {
    res.status(200).json({ message: "createPayment" });
  };

  updatePayment = async (req, res) => {
    res.status(200).json({ message: "updatePayment" });
  };

  deletePayment = async (req, res) => {
    res.status(200).json({ message: "deletePayment" });
  };

  forceDeletePayment = async (req, res) => {
    res.status(200).json({ message: "forceDeletePayment" });
  };
}

export default PaymentsController;
