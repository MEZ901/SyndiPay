class RegisterUseCase {
  constructor(authServices) {
    this.authServices = authServices;
  }

  execute = async (userCredentials) => {
    await this.authServices.validateRegisterInputs(userCredentials);

    delete userCredentials.confirmPassword;

    await this.authServices.validateEmailUnique(userCredentials.email);

    await this.authServices.validateUserNameUnique(userCredentials.userName);

    const hashedPassword = await this.authServices.hashPassword(
      userCredentials.password
    );

    const user = await this.authServices.register({
      ...userCredentials,
      password: hashedPassword,
    });

    const accessToken = await this.authServices.generateAccessToken(user);
    const refreshToken = await this.authServices.generateRefreshToken({
      id: user.id,
    });

    await this.authServices.storeRefreshTokenInDatabase(refreshToken, user.id);

    return {
      status: 200,
      jwt: {
        accessToken,
        refreshToken,
      },
      data: {
        id: user.id,
        userName: user.userName,
        image: user.image,
        email: user.email,
        isVerified: user.isVerified,
      },
    };
  };
}

export default RegisterUseCase;
