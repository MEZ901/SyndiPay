import BaseRepository from "./BaseRepository.js";

class ApartmentRepository extends BaseRepository {
  findByApartmentNumber = async (apartmentNumber) => {
    const apartment = await this.model.findOne({ apartmentNumber });
    return apartment;
  };
}

export default ApartmentRepository;
