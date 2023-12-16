class DeletePaymentUseCase {
  constructor({ paymentsServices }) {
    this.paymentsServices = paymentsServices;
  }

  softDelete = async (id) => {
    const payment = await this.paymentsServices.softDelete(id);
    return {
      status: 200,
      data: {
        message: `Payment with id ${payment.id} has been soft deleted successfully`,
      },
    };
  };

  forceDelete = async (id) => {
    const payment = await this.paymentsServices.forceDelete(id);
    return {
      status: 200,
      data: {
        message: `Payment with id ${payment.id} has been force deleted successfully`,
      },
    };
  };
}

export default DeletePaymentUseCase;
