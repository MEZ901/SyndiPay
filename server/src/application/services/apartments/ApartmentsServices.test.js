import ApartmentsServices from "./ApartmentsServices";
import { jest } from "@jest/globals";

describe("ApartmentsServices", () => {
  let apartmentsServices;
  let apartmentRepository;
  let residentsServices;

  beforeEach(() => {
    apartmentRepository = {
      findByApartmentNumber: jest.fn(),
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      softDelete: jest.fn(),
      forceDelete: jest.fn(),
    };
    residentsServices = {
      getResidentById: jest.fn(),
    };

    apartmentsServices = new ApartmentsServices({
      apartmentRepository,
      residentsServices,
    });
  });

  describe("validateAddApartmentInputs", () => {
    it("should throw an error if apartment number already exists", async () => {
      const data = {
        apartmentNumber: "123",
        currentResident: "residentId",
      };

      apartmentRepository.findByApartmentNumber.mockResolvedValue({});

      await expect(
        apartmentsServices.validateAddApartmentInputs(data)
      ).rejects.toThrow("Apartment number already exists");
    });

    it("should throw an error if resident does not exist", async () => {
      const data = {
        apartmentNumber: "123",
        currentResident: "residentId",
      };

      apartmentRepository.findByApartmentNumber.mockResolvedValue(null);
      residentsServices.getResidentById.mockResolvedValue(null);

      await expect(
        apartmentsServices.validateAddApartmentInputs(data)
      ).rejects.toThrow("Resident does not exist");
    });
  });

  describe("validateUpdateApartmentInputs", () => {
    it("should validate update apartment inputs", async () => {
      const data = {
        apartmentNumber: "123",
      };

      apartmentRepository.findByApartmentNumber.mockResolvedValue(null);

      await apartmentsServices.validateUpdateApartmentInputs(data);

      expect(apartmentRepository.findByApartmentNumber).toHaveBeenCalledWith(
        "123"
      );
    });

    it("should throw an error if apartment number already exists", async () => {
      const data = {
        apartmentNumber: "123",
      };

      apartmentRepository.findByApartmentNumber.mockResolvedValue({});

      await expect(
        apartmentsServices.validateUpdateApartmentInputs(data)
      ).rejects.toThrow("Apartment number already exists");
    });
  });

  describe("createApartment", () => {
    it("should create an apartment", async () => {
      const data = {
        apartmentNumber: "123",
      };
      const createdApartment = { _id: "apartmentId", ...data };

      apartmentRepository.create.mockResolvedValue(createdApartment);

      const result = await apartmentsServices.createApartment(data);

      expect(apartmentRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(createdApartment);
    });
  });

  describe("getAllApartments", () => {
    it("should get all apartments for a syndic", async () => {
      const syndic = "syndicId";
      const apartments = [{ _id: "apartmentId", apartmentNumber: "123" }];

      apartmentRepository.find.mockResolvedValue(apartments);

      const result = await apartmentsServices.getAllApartments(syndic);

      expect(apartmentRepository.find).toHaveBeenCalledWith({ syndic });
      expect(result).toEqual(apartments);
    });
  });

  describe("getApartmentById", () => {
    it("should get an apartment by ID for a syndic", async () => {
      const apartmentId = "apartmentId";
      const syndic = "syndicId";
      const apartment = { _id: apartmentId, apartmentNumber: "123" };

      apartmentRepository.findOne.mockResolvedValue(apartment);

      const result = await apartmentsServices.getApartmentById(
        apartmentId,
        syndic
      );

      expect(apartmentRepository.findOne).toHaveBeenCalledWith({
        _id: apartmentId,
        syndic,
      });
      expect(result).toEqual(apartment);
    });
  });

  describe("updateApartment", () => {
    it("should update an apartment", async () => {
      const apartmentId = "apartmentId";
      const data = {
        apartmentNumber: "123",
      };
      const updatedApartment = { _id: apartmentId, ...data };

      apartmentRepository.update.mockResolvedValue(updatedApartment);

      const result = await apartmentsServices.updateApartment(
        apartmentId,
        data
      );

      expect(apartmentRepository.update).toHaveBeenCalledWith(
        apartmentId,
        data
      );
      expect(result).toEqual(updatedApartment);
    });
  });

  describe("softDelete", () => {
    it("should soft delete an apartment", async () => {
      const apartmentId = "apartmentId";
      const softDeletedApartment = { _id: apartmentId, deleted: true };

      apartmentRepository.softDelete.mockResolvedValue(softDeletedApartment);

      const result = await apartmentsServices.softDelete(apartmentId);

      expect(apartmentRepository.softDelete).toHaveBeenCalledWith(apartmentId);
      expect(result).toEqual(softDeletedApartment);
    });
  });

  describe("forceDelete", () => {
    it("should force delete an apartment", async () => {
      const apartmentId = "apartmentId";
      const deletedApartment = { _id: apartmentId, deleted: true };

      apartmentRepository.forceDelete.mockResolvedValue(deletedApartment);

      const result = await apartmentsServices.forceDelete(apartmentId);

      expect(apartmentRepository.forceDelete).toHaveBeenCalledWith(apartmentId);
      expect(result).toEqual(deletedApartment);
    });
  });
});
