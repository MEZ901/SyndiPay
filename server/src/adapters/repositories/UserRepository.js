import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async findByUserName(userName) {
    return this.model.findOne({ userName });
  }

  async findByEmailOrUserName(emailOrUserName) {
    return this.model.findOne({
      $or: [{ email: emailOrUserName }, { userName: emailOrUserName }],
    });
  }
}

export default UserRepository;
