import PaymentsServices from "./PaymentsServices";
import { jest } from "@jest/globals";

describe("PaymentsServices", () => {
  let paymentsServices;
  let paymentRepository;

  beforeEach(() => {
    paymentRepository = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };

    paymentsServices = new PaymentsServices({ paymentRepository });
  });

  describe("getAllPayments", () => {
    it("should get all payments", async () => {
      const payments = [{ _id: "paymentId", amount: 100 }];

      paymentRepository.find.mockResolvedValue(payments);

      const result = await paymentsServices.getAllPayments();

      expect(paymentRepository.find).toHaveBeenCalled();
      expect(result).toEqual(payments);
    });
  });

  describe("getOnePayment", () => {
    it("should get a payment by ID", async () => {
      const paymentId = "paymentId";
      const payment = { _id: paymentId, amount: 100 };

      paymentRepository.findById.mockResolvedValue(payment);

      const result = await paymentsServices.getOnePayment(paymentId);

      expect(paymentRepository.findById).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(payment);
    });
  });

  describe("validateUpdatePaymentInputs", () => {
    it("should validate update payment inputs", async () => {
      const payment = { amount: 100 };

      await expect(
        paymentsServices.validateUpdatePaymentInputs(payment)
      ).resolves.not.toThrow();
    });
  });

  describe("createPayment", () => {
    it("should create a payment", async () => {
      const payment = { amount: 100 };
      const createdPayment = { _id: "paymentId", ...payment };

      paymentRepository.create.mockResolvedValue(createdPayment);

      const result = await paymentsServices.createPayment(payment);

      expect(paymentRepository.create).toHaveBeenCalledWith(payment);
      expect(result).toEqual(createdPayment);
    });
  });

  describe("updatePayment", () => {
    it("should update a payment", async () => {
      const paymentId = "paymentId";
      const payment = { amount: 100 };
      const updatedPayment = { _id: paymentId, ...payment };

      paymentRepository.update.mockResolvedValue(updatedPayment);

      const result = await paymentsServices.updatePayment(paymentId, payment);

      expect(paymentRepository.update).toHaveBeenCalledWith(paymentId, payment);
      expect(result).toEqual(updatedPayment);
    });
  });

  describe("softDelete", () => {
    it("should soft delete a payment", async () => {
      const paymentId = "paymentId";
      const softDeletedPayment = { _id: paymentId, deleted: true };

      paymentRepository.softDelete.mockResolvedValue(softDeletedPayment);

      const result = await paymentsServices.softDelete(paymentId);

      expect(paymentRepository.softDelete).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(softDeletedPayment);
    });
  });

  describe("forceDelete", () => {
    it("should force delete a payment", async () => {
      const paymentId = "paymentId";
      const deletedPayment = { _id: paymentId, deleted: true };

      paymentRepository.forceDelete.mockResolvedValue(deletedPayment);

      const result = await paymentsServices.forceDelete(paymentId);

      expect(paymentRepository.forceDelete).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(deletedPayment);
    });
  });
});
