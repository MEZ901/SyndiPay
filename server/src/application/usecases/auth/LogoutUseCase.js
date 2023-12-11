import ClientError from "../../../infrastructure/exceptions/ClientError.js";

class LogoutUseCase {
  constructor(authServices) {
    this.authServices = authServices;
  }

  execute = async (refreshToken) => {
    if (!refreshToken) {
      throw new ClientError("Missing refresh token");
    }

    await this.authServices.verifyToken(refreshToken);

    await this.authServices.deleteRefreshTokenFromDatabase(refreshToken);

    return {
      status: 200,
      data: {
        message: "Logout successfully",
      },
    };
  };
}

export default LogoutUseCase;
