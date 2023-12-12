import BaseRepository from "./BaseRepository.js";

class UserTokenRepository extends BaseRepository {
  findByToken = async (token) => {
    const document = await this.model.findOne({ refreshToken: token });
    return document;
  };

  upsert = async (token, userId) => {
    const document = await this.model.findOneAndUpdate(
      { userId },
      { refreshToken: token },
      { upsert: true, new: true }
    );
    return document;
  };

  softDeleteByToken = async (token) => {
    const document = await this.model.findOneAndUpdate(
      { refreshToken: token },
      { isDeleted: true },
      { new: true }
    );
    return document;
  };

  softDeleteByUserId = async (userId) => {
    const document = await this.model.findOneAndUpdate(
      { userId },
      { isDeleted: true },
      { new: true }
    );
    return document;
  };
}

export default UserTokenRepository;