class CreatePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  execute = async (payment) => {};
}

export default CreatePaymentUseCase;
