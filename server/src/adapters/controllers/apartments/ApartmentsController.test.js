import ApartmentsController from "./ApartmentsController";
import { jest } from "@jest/globals";

describe("ApartmentsController", () => {
  let apartmentsController;
  let createApartmentUseCase;
  let readApartmentUseCase;
  let updateApartmentUseCase;
  let deleteApartmentUseCase;

  beforeEach(() => {
    createApartmentUseCase = {
      execute: jest.fn(),
    };
    readApartmentUseCase = {
      getAllApartments: jest.fn(),
      getOneApartment: jest.fn(),
    };
    updateApartmentUseCase = {
      execute: jest.fn(),
    };
    deleteApartmentUseCase = {
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };

    apartmentsController = new ApartmentsController({
      createApartmentUseCase,
      readApartmentUseCase,
      updateApartmentUseCase,
      deleteApartmentUseCase,
    });
  });

  describe("getAllApartments", () => {
    it("should call readApartmentUseCase.getAllApartments and return the result", async () => {
      const req = { user: { id: "syndicId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: [{ apartment: "data" }] };
      readApartmentUseCase.getAllApartments.mockResolvedValue(result);

      await apartmentsController.getAllApartments(req, res);

      expect(readApartmentUseCase.getAllApartments).toHaveBeenCalledWith(
        "syndicId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ apartment: "data" }]);
    });
  });

  describe("getApartmentById", () => {
    it("should call readApartmentUseCase.getOneApartment and return the result", async () => {
      const req = { params: { id: "apartmentId" }, user: { id: "syndicId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { apartment: "data" } };
      readApartmentUseCase.getOneApartment.mockResolvedValue(result);

      await apartmentsController.getApartmentById(req, res);

      expect(readApartmentUseCase.getOneApartment).toHaveBeenCalledWith(
        "apartmentId",
        "syndicId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ apartment: "data" });
    });
  });

  describe("createApartment", () => {
    it("should call createApartmentUseCase.execute and return the result", async () => {
      const req = {
        body: { apartmentNumber: "data", currentResident: "data" },
        user: { id: "syndicId" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { apartment: "created" } };
      createApartmentUseCase.execute.mockResolvedValue(result);

      await apartmentsController.createApartment(req, res);

      expect(createApartmentUseCase.execute).toHaveBeenCalledWith({
        apartmentNumber: "data",
        currentResident: "data",
        syndic: "syndicId",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ apartment: "created" });
    });
  });

  describe("updateApartment", () => {
    it("should call updateApartmentUseCase.execute and return the result", async () => {
      const req = {
        params: { id: "apartmentId" },
        body: { apartment: "data" },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { apartment: "updated" } };
      updateApartmentUseCase.execute.mockResolvedValue(result);

      await apartmentsController.updateApartment(req, res);

      expect(updateApartmentUseCase.execute).toHaveBeenCalledWith(
        "apartmentId",
        {}
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ apartment: "updated" });
    });
  });

  describe("deleteApartment", () => {
    it("should call deleteApartmentUseCase.softDelete and return the result", async () => {
      const req = { params: { id: "apartmentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "deleted" } };
      deleteApartmentUseCase.softDelete.mockResolvedValue(result);

      await apartmentsController.deleteApartment(req, res);

      expect(deleteApartmentUseCase.softDelete).toHaveBeenCalledWith(
        "apartmentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "deleted" });
    });
  });

  describe("forceDeleteApartment", () => {
    it("should call deleteApartmentUseCase.forceDelete and return the result", async () => {
      const req = { params: { id: "apartmentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "force deleted" } };
      deleteApartmentUseCase.forceDelete.mockResolvedValue(result);

      await apartmentsController.forceDeleteApartment(req, res);

      expect(deleteApartmentUseCase.forceDelete).toHaveBeenCalledWith(
        "apartmentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "force deleted" });
    });
  });
});
