class UpdatePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  execute = async (id, payment) => {};
}

export default UpdatePaymentUseCase;
