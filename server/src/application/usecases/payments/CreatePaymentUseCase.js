class CreatePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  execute = async (payment) => {
    await this.paymentsServices.validateAddPaymentInputs(payment);

    const createdPayment = await this.paymentsServices.createPayment(payment);

    return {
      status: 200,
      data: createdPayment,
    };
  };
}

export default CreatePaymentUseCase;
