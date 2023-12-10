import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import container from "./Container.js";
import User from "../infrastructure/database/models/User.js";
import UserToken from "../infrastructure/database/models/UserToken.js";
import SecurityService from "../infrastructure/packages/bcrypt/SecurityService.js";
import JsonWebToken from "../infrastructure/packages/jwt/JsonWebToken.js";
import UserRepository from "../adapters/repositories/UserRepository.js";
import AuthServices from "../application/services/auth/AuthServices.js";
import LoginUseCase from "../application/usecases/auth/LoginUseCase.js";
import LogoutUseCase from "../application/usecases/auth/LogoutUseCase.js";
import RefreshTokenUseCase from "../application/usecases/auth/RefreshTokenUseCase.js";
import RegisterUseCase from "../application/usecases/auth/RegisterUseCase.js";
import AuthController from "../adapters/controllers/auth/AuthController.js";
import UserTokenRepository from "../adapters/repositories/UserTokenRepository.js";

class DependencyInjection {
  static setup = () => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const privatePemPath = path.resolve(__dirname, "../../keys/private.pem");
    const publicPemPath = path.resolve(__dirname, "../../keys/public.pem");

    const jsonWebToken = new JsonWebToken(
      fs.readFileSync(privatePemPath),
      fs.readFileSync(publicPemPath)
    );

    const userRepository = new UserRepository(User);
    const userTokenRepository = new UserTokenRepository(UserToken);
    const securityService = new SecurityService();
    const authService = new AuthServices(
      userRepository,
      userTokenRepository,
      securityService,
      jsonWebToken
    );
    const loginUseCase = new LoginUseCase(authService);
    const registerUseCase = new RegisterUseCase(authService);
    const refreshTokenUseCase = new RefreshTokenUseCase(authService);
    const logoutUseCase = new LogoutUseCase(authService);
    const authController = new AuthController(
      loginUseCase,
      registerUseCase,
      logoutUseCase,
      refreshTokenUseCase
    );

    const dependencies = [
      { name: "jsonWebToken", instance: jsonWebToken },
      { name: "userRepository", instance: userRepository },
      { name: "userTokenRepository", instance: userTokenRepository },
      { name: "securityService", instance: securityService },
      { name: "authService", instance: authService },
      { name: "loginUseCase", instance: loginUseCase },
      { name: "registerUseCase", instance: registerUseCase },
      { name: "refreshTokenUseCase", instance: refreshTokenUseCase },
      { name: "logoutUseCase", instance: logoutUseCase },
      { name: "authController", instance: authController },
    ];

    dependencies.forEach((dependency) => {
      container.register(dependency.name, dependency.instance);
    });
  };
}

export default DependencyInjection;
