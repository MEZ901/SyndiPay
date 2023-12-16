import BaseRepository from "./BaseRepository.js";

class ResidentRepository extends BaseRepository {
  findByName = async (name) => {
    const resident = await this.model.findOne({ name });
    return resident;
  };
}

export default ResidentRepository;
