import validateData from "../../../infrastructure/helpers/validateData.js";
import ClientError from "../../../infrastructure/exceptions/ClientError.js";
import NotFoundError from "../../../infrastructure/exceptions/NotFoundError.js";

class AuthServices {
  constructor(
    userRepository,
    userTokenRepository,
    securityService,
    jsonWebToken
  ) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.securityService = securityService;
    this.jsonWebToken = jsonWebToken;
  }

  register = async (data) => {
    const user = await this.userRepository.create(data);

    return {
      id: user.id,
      userName: user.userName,
      image: user.image,
      email: user.email,
      isVerified: user.isVerified,
    };
  };

  validateUserCredentials = async (userCredentials) => {
    await this.validateRegisterInputs(userCredentials);
    await this.validateEmailUnique(userCredentials.email);
    await this.validateUserNameUnique(userCredentials.userName);
  };

  prepareUserCredentials = async (userCredentials) => {
    delete userCredentials.confirmPassword;
    userCredentials.password = await this.hashPassword(
      userCredentials.password
    );
  };

  generateTokens = async (user) => {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken({
      id: user.id,
    });
    return { accessToken, refreshToken };
  };

  validateRegisterInputs = async (data) => {
    await validateData(data, "register");
  };

  validateLoginInputs = async (data) => {
    await validateData(data, "login");
  };

  validateEmailUnique = async (email) => {
    try {
      await this.userRepository.findByEmail(email);
      throw new ClientError("Email already exists");
    } catch (error) {
      if (error instanceof NotFoundError) {
        return;
      }
    }
  };

  validateUserNameUnique = async (userName) => {
    try {
      await this.userRepository.findByUserName(userName);
      throw new ClientError("Email already exists");
    } catch (error) {
      if (error instanceof NotFoundError) {
        return;
      }
    }
  };

  hashPassword = async (password) => {
    return await this.securityService.hashPassword(password);
  };

  generateAccessToken = async (payload) => {
    return await this.jsonWebToken.sign(payload, "15m");
  };

  generateRefreshToken = async (payload) => {
    return await this.jsonWebToken.sign(payload, "30d");
  };

  storeRefreshTokenInDatabase = async (refreshToken, userId) => {
    await this.userTokenRepository.upsert(refreshToken, userId);
  };

  deleteRefreshTokenFromDatabase = async (refreshToken) => {};

  checkRefreshTokenInDatabase = async (refreshToken) => {};
}

export default AuthServices;
