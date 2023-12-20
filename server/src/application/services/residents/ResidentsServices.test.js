import ResidentsServices from "./ResidentsServices";
import { jest } from "@jest/globals";

describe("ResidentsServices", () => {
  let residentsServices;
  let residentRepository;

  beforeEach(() => {
    residentRepository = {
      find: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };

    residentsServices = new ResidentsServices({ residentRepository });
  });

  describe("getAllResidents", () => {
    it("should get all residents", async () => {
      const residents = [{ _id: "residentId", name: "John Doe" }];

      residentRepository.find.mockResolvedValue(residents);

      const result = await residentsServices.getAllResidents();

      expect(residentRepository.find).toHaveBeenCalled();
      expect(result).toEqual(residents);
    });
  });

  describe("getResidentById", () => {
    it("should get a resident by ID", async () => {
      const residentId = "residentId";
      const resident = { _id: residentId, name: "John Doe" };

      residentRepository.findById.mockResolvedValue(resident);

      const result = await residentsServices.getResidentById(residentId);

      expect(residentRepository.findById).toHaveBeenCalledWith(residentId);
      expect(result).toEqual(resident);
    });
  });

  describe("validateAddResidentInputs", () => {
    it("should validate add resident inputs", async () => {
      const resident = { name: "John Doe" };

      residentRepository.findByName.mockResolvedValue(null);

      await residentsServices.validateAddResidentInputs(resident);

      expect(residentRepository.findByName).toHaveBeenCalledWith(resident.name);
    });

    it("should throw an error if resident name already exists", async () => {
      const resident = { name: "John Doe" };

      residentRepository.findByName.mockResolvedValue({});

      await expect(
        residentsServices.validateAddResidentInputs(resident)
      ).rejects.toThrow("Resident name already exists");
    });
  });

  describe("validateUpdateResidentInputs", () => {
    it("should validate update resident inputs", async () => {
      const resident = { name: "John Doe" };

      residentRepository.findByName.mockResolvedValue(null);

      await residentsServices.validateUpdateResidentInputs(resident);

      expect(residentRepository.findByName).toHaveBeenCalledWith(resident.name);
    });

    it("should throw an error if resident name already exists", async () => {
      const resident = { name: "John Doe" };

      residentRepository.findByName.mockResolvedValue({});

      await expect(
        residentsServices.validateUpdateResidentInputs(resident)
      ).rejects.toThrow("Resident name already exists");
    });
  });

  describe("createResident", () => {
    it("should create a resident", async () => {
      const resident = { name: "John Doe" };
      const createdResident = { _id: "residentId", ...resident };

      residentRepository.create.mockResolvedValue(createdResident);

      const result = await residentsServices.createResident(resident);

      expect(residentRepository.create).toHaveBeenCalledWith(resident);
      expect(result).toEqual(createdResident);
    });
  });

  describe("updateResident", () => {
    it("should update a resident", async () => {
      const residentId = "residentId";
      const resident = { name: "John Doe" };
      const updatedResident = { _id: residentId, ...resident };

      residentRepository.update.mockResolvedValue(updatedResident);

      const result = await residentsServices.updateResident(
        residentId,
        resident
      );

      expect(residentRepository.update).toHaveBeenCalledWith(
        residentId,
        resident
      );
      expect(result).toEqual(updatedResident);
    });
  });

  describe("softDeleteResident", () => {
    it("should soft delete a resident", async () => {
      const residentId = "residentId";
      const softDeletedResident = { _id: residentId, deleted: true };

      residentRepository.softDelete.mockResolvedValue(softDeletedResident);

      const result = await residentsServices.softDeleteResident(residentId);

      expect(residentRepository.softDelete).toHaveBeenCalledWith(residentId);
      expect(result).toEqual(softDeletedResident);
    });
  });

  describe("forceDeleteResident", () => {
    it("should force delete a resident", async () => {
      const residentId = "residentId";
      const deletedResident = { _id: residentId, deleted: true };

      residentRepository.forceDelete.mockResolvedValue(deletedResident);

      const result = await residentsServices.forceDeleteResident(residentId);

      expect(residentRepository.forceDelete).toHaveBeenCalledWith(residentId);
      expect(result).toEqual(deletedResident);
    });
  });
});
