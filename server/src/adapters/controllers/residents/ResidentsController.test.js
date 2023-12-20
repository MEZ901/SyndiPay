import ResidentsController from "./ResidentsController";
import { jest } from "@jest/globals";

describe("ResidentsController", () => {
  let residentsController;
  let createResidentUseCase;
  let readResidentUseCase;
  let updateResidentUseCase;
  let deleteResidentUseCase;

  beforeEach(() => {
    createResidentUseCase = {
      execute: jest.fn(),
    };
    readResidentUseCase = {
      getAllResidents: jest.fn(),
      getOneResident: jest.fn(),
    };
    updateResidentUseCase = {
      execute: jest.fn(),
    };
    deleteResidentUseCase = {
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };

    residentsController = new ResidentsController({
      createResidentUseCase,
      readResidentUseCase,
      updateResidentUseCase,
      deleteResidentUseCase,
    });
  });

  describe("getAllResidents", () => {
    it("should call readResidentUseCase.getAllResidents and return the result", async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: [{ resident: "data" }] };
      readResidentUseCase.getAllResidents.mockResolvedValue(result);

      await residentsController.getAllResidents({}, res);

      expect(readResidentUseCase.getAllResidents).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ resident: "data" }]);
    });
  });

  describe("getResidentById", () => {
    it("should call readResidentUseCase.getOneResident and return the result", async () => {
      const req = { params: { id: "residentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { resident: "data" } };
      readResidentUseCase.getOneResident.mockResolvedValue(result);

      await residentsController.getResidentById(req, res);

      expect(readResidentUseCase.getOneResident).toHaveBeenCalledWith(
        "residentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ resident: "data" });
    });
  });

  describe("createResident", () => {
    it("should call createResidentUseCase.execute and return the result", async () => {
      const req = {
        body: {
          name: "John Doe",
          contactInfo: "john@example.com",
          isOwner: true,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { resident: "created" } };
      createResidentUseCase.execute.mockResolvedValue(result);

      await residentsController.createResident(req, res);

      expect(createResidentUseCase.execute).toHaveBeenCalledWith({
        name: "John Doe",
        contactInfo: "john@example.com",
        isOwner: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ resident: "created" });
    });
  });

  describe("updateResident", () => {
    it("should call updateResidentUseCase.execute and return the result", async () => {
      const req = {
        params: { id: "residentId" },
        body: {
          name: "John Doe",
          contactInfo: "john@example.com",
          isOwner: true,
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { resident: "updated" } };
      updateResidentUseCase.execute.mockResolvedValue(result);

      await residentsController.updateResident(req, res);

      expect(updateResidentUseCase.execute).toHaveBeenCalledWith("residentId", {
        name: "John Doe",
        contactInfo: "john@example.com",
        isOwner: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ resident: "updated" });
    });
  });

  describe("deleteResident", () => {
    it("should call deleteResidentUseCase.softDelete and return the result", async () => {
      const req = { params: { id: "residentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "deleted" } };
      deleteResidentUseCase.softDelete.mockResolvedValue(result);

      await residentsController.deleteResident(req, res);

      expect(deleteResidentUseCase.softDelete).toHaveBeenCalledWith(
        "residentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "deleted" });
    });
  });

  describe("forceDeleteResident", () => {
    it("should call deleteResidentUseCase.forceDelete and return the result", async () => {
      const req = { params: { id: "residentId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const result = { status: 200, data: { message: "force deleted" } };
      deleteResidentUseCase.forceDelete.mockResolvedValue(result);

      await residentsController.forceDeleteResident(req, res);

      expect(deleteResidentUseCase.forceDelete).toHaveBeenCalledWith(
        "residentId"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "force deleted" });
    });
  });
});
