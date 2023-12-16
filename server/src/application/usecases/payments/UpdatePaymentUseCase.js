class UpdatePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  execute = async (id, payment) => {
    await this.paymentsServices.validateUpdatePaymentInputs(payment);

    const paymentUpdated = await this.paymentsServices.updatePayment(
      id,
      payment
    );

    return {
      status: 200,
      data: paymentUpdated,
    };
  };
}

export default UpdatePaymentUseCase;
