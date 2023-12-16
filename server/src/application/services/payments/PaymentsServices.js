import validateData from "../../../infrastructure/helpers/validateData.js";

class PaymentsServices {
  constructor({ paymentRepository }) {
    this.paymentRepository = paymentRepository;
  }

  getAllPayments = async () => {
    const payments = await this.paymentRepository.find();
    return payments;
  };

  getOnePayment = async (id) => {
    const payment = await this.paymentRepository.findById(id);
    return payment;
  };

  validateAddPaymentInputs = async (payment) => {
    await validateData(payment, "addPayment");
  };

  validateUpdatePaymentInputs = async (payment) => {
    await validateData(payment, "updatePayment");
  };

  createPayment = async (payment) => {
    const createdPayment = await this.paymentRepository.create(payment);
    return createdPayment;
  };

  updatePayment = async (id, payment) => {
    const updatedPayment = await this.paymentRepository.update(id, payment);
    return updatedPayment;
  };

  softDelete = async (id) => {
    const payment = await this.paymentRepository.softDelete(id);
    return payment;
  };

  forceDelete = async (id) => {
    const payment = await this.paymentRepository.forceDelete(id);
    return payment;
  };
}

export default PaymentsServices;
