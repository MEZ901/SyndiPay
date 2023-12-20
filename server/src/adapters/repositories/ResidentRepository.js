import BaseRepository from "./BaseRepository.js";

class ResidentRepository extends BaseRepository {
  findByName = async (name, includeDeleted = false) => {
    const query = includeDeleted ? { name } : { name, isDeleted: false };
    const resident = await this.model.findOne(query);
    return resident;
  };
}

export default ResidentRepository;
