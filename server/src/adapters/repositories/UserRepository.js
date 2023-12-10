import NotFoundError from "../../infrastructure/exceptions/NotFoundError.js";
import BaseRepository from "./BaseRepository.js";

class UserRepository extends BaseRepository {
  async findByEmail(email) {
    const document = await this.model.findOne({ email });
    if (!document) {
      throw new NotFoundError("Document not found");
    }
    return document;
  }

  async findByUserName(username) {
    const document = await this.model.findOne({ username });
    if (!document) {
      throw new NotFoundError("Document not found");
    }
    return document;
  }

  async findByEmailOrUsername(email, username) {
    const query = {
      $or: [{ email }, { username }],
    };
    const document = await this.model.findOne(query);
    if (!document) {
      throw new NotFoundError("Document not found");
    }
    return document;
  }
}

export default UserRepository;
