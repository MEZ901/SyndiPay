class DeletePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  softDelete = async (id) => {};

  forceDelete = async (id) => {};
}

export default DeletePaymentUseCase;
