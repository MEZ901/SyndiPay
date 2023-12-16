class ReadPaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  getAllPayments = async () => {
    const payments = await this.paymentsServices.getAllPayments();
    return {
      status: 200,
      data: payments,
    };
  };

  getOnePayment = async (id) => {
    const payment = await this.paymentsServices.getOnePayment(id);
    return {
      status: 200,
      data: payment,
    };
  };
}

export default ReadPaymentUseCase;
