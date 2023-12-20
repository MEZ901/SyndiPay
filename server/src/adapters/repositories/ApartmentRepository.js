import BaseRepository from "./BaseRepository.js";

class ApartmentRepository extends BaseRepository {
  find = async (conditions = {}, includeDeleted = false) => {
    const query = includeDeleted
      ? conditions
      : { ...conditions, isDeleted: false };

    return await this.model
      .find(query)
      .populate("currentResident")
      .populate("previousResidents");
  };

  findOne = async (conditions = {}, includeDeleted = false) => {
    const query = includeDeleted
      ? conditions
      : { ...conditions, isDeleted: false };

    return await this.model
      .findOne(query)
      .populate("currentResident")
      .populate("previousResidents");
  };

  findByApartmentNumber = async (apartmentNumber) => {
    const apartment = await this.model.findOne({ apartmentNumber });
    return apartment;
  };
}

export default ApartmentRepository;
