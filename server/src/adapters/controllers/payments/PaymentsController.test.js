import PaymentsController from "./PaymentsController";
import { jest } from "@jest/globals";

describe("PaymentsController", () => {
  let paymentsController;
  let createPaymentUseCase;
  let readPaymentUseCase;
  let updatePaymentUseCase;
  let deletePaymentUseCase;

  beforeEach(() => {
    createPaymentUseCase = {
      execute: jest.fn(),
    };
    readPaymentUseCase = {
      getAllPayments: jest.fn(),
      getOnePayment: jest.fn(),
    };
    updatePaymentUseCase = {
      execute: jest.fn(),
    };
    deletePaymentUseCase = {
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };

    paymentsController = new PaymentsController({
      createPaymentUseCase,
      readPaymentUseCase,
      updatePaymentUseCase,
      deletePaymentUseCase,
    });
  });

  describe("getAllPayments", () => {
    it("should call readPaymentUseCase.getAllPayments and return the result", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: [{ payment: "data" }] };
      readPaymentUseCase.getAllPayments.mockResolvedValue(result);

      await paymentsController.getAllPayments({}, res);

      expect(readPaymentUseCase.getAllPayments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ payment: "data" }]);
    });
  });

  describe("getPaymentById", () => {
    it("should call readPaymentUseCase.getOnePayment and return the result", async () => {
      const req = { params: { id: "paymentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { payment: "data" } };
      readPaymentUseCase.getOnePayment.mockResolvedValue(result);

      await paymentsController.getPaymentById(req, res);

      expect(readPaymentUseCase.getOnePayment).toHaveBeenCalledWith(
        "paymentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ payment: "data" });
    });
  });

  describe("createPayment", () => {
    it("should call createPaymentUseCase.execute and return the result", async () => {
      const req = {
        body: {
          apartment: "apartmentId",
          resident: "residentId",
          amount: 100,
          paymentDate: "2022-01-01",
          paymentDuration: "monthly",
          paymentMethod: "credit card",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { payment: "created" } };
      createPaymentUseCase.execute.mockResolvedValue(result);

      await paymentsController.createPayment(req, res);

      expect(createPaymentUseCase.execute).toHaveBeenCalledWith({
        apartment: "apartmentId",
        resident: "residentId",
        amount: 100,
        paymentDate: "2022-01-01",
        paymentDuration: "monthly",
        paymentMethod: "credit card",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ payment: "created" });
    });
  });

  describe("updatePayment", () => {
    it("should call updatePaymentUseCase.execute and return the result", async () => {
      const req = {
        params: { id: "paymentId" },
        body: {
          apartment: "newApartmentId",
          resident: "newResidentId",
          amount: 200,
          paymentDate: "2022-02-01",
          paymentDuration: "yearly",
          paymentMethod: "bank transfer",
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { payment: "updated" } };
      updatePaymentUseCase.execute.mockResolvedValue(result);

      await paymentsController.updatePayment(req, res);

      expect(updatePaymentUseCase.execute).toHaveBeenCalledWith("paymentId", {
        apartment: "newApartmentId",
        resident: "newResidentId",
        amount: 200,
        paymentDate: "2022-02-01",
        paymentDuration: "yearly",
        paymentMethod: "bank transfer",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ payment: "updated" });
    });
  });

  describe("deletePayment", () => {
    it("should call deletePaymentUseCase.softDelete and return the result", async () => {
      const req = { params: { id: "paymentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "deleted" } };
      deletePaymentUseCase.softDelete.mockResolvedValue(result);

      await paymentsController.deletePayment(req, res);

      expect(deletePaymentUseCase.softDelete).toHaveBeenCalledWith("paymentId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "deleted" });
    });
  });

  describe("forceDeletePayment", () => {
    it("should call deletePaymentUseCase.forceDelete and return the result", async () => {
      const req = { params: { id: "paymentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "force deleted" } };
      deletePaymentUseCase.forceDelete.mockResolvedValue(result);

      await paymentsController.forceDeletePayment(req, res);

      expect(deletePaymentUseCase.forceDelete).toHaveBeenCalledWith(
        "paymentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "force deleted" });
    });
  });
});
