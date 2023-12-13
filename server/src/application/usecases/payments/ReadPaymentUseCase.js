class ReadPaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  getAllPayments = async () => {};

  getOnePayment = async (id) => {};
}

export default ReadPaymentUseCase;
