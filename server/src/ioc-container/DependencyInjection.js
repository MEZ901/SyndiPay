import fs from "fs";
import path from "path";
import container from "./Container.js";

// helpers ============================================================================
import getCurrentDirname from "../infrastructure/helpers/getCurrentDirname.js";
// ====================================================================================

// packages ===========================================================================
import SecurityService from "../infrastructure/packages/bcrypt/SecurityService.js";
import JsonWebToken from "../infrastructure/packages/jwt/JsonWebToken.js";
// ====================================================================================

// models =============================================================================
import User from "../infrastructure/database/models/User.js";
import UserToken from "../infrastructure/database/models/UserToken.js";
import Apartment from "../infrastructure/database/models/Apartment.js";
import Resident from "../infrastructure/database/models/Resident.js";
import Payment from "../infrastructure/database/models/Payment.js";
// ====================================================================================

// repositories =======================================================================
import UserRepository from "../adapters/repositories/UserRepository.js";
import UserTokenRepository from "../adapters/repositories/UserTokenRepository.js";
import ApartmentRepository from "../adapters/repositories/ApartmentRepository.js";
import ResidentRepository from "../adapters/repositories/ResidentRepository.js";
import PaymentRepository from "../adapters/repositories/PaymentRepository.js";
// ====================================================================================

// controllers ========================================================================
import AuthController from "../adapters/controllers/auth/AuthController.js";
import ApartmentsController from "../adapters/controllers/apartments/ApartmentsController.js";
import ResidentsController from "../adapters/controllers/residents/ResidentsController.js";
import PaymentsController from "../adapters/controllers/payments/PaymentsController.js";
// ====================================================================================

// middlewares ========================================================================
import AuthMiddleware from "../adapters/middlewares/AuthMiddleware.js";
// ====================================================================================

// services ===========================================================================
import AuthServices from "../application/services/auth/AuthServices.js";
import ApartmentsServices from "../application/services/apartments/ApartmentsServices.js";
import ResidentsServices from "../application/services/residents/ResidentsServices.js";
import PaymentsServices from "../application/services/payments/PaymentsServices.js";
// ====================================================================================

// use cases ==========================================================================
import LoginUseCase from "../application/usecases/auth/LoginUseCase.js";
import LogoutUseCase from "../application/usecases/auth/LogoutUseCase.js";
import RefreshTokenUseCase from "../application/usecases/auth/RefreshTokenUseCase.js";
import RegisterUseCase from "../application/usecases/auth/RegisterUseCase.js";

import CreateApartmentUseCase from "../application/usecases/apartments/CreateApartmentUseCase.js";
import ReadApartmentUseCase from "../application/usecases/apartments/ReadApartmentUseCase.js";
import UpdateApartmentUseCase from "../application/usecases/apartments/UpdateApartmentUseCase.js";
import DeleteApartmentUseCase from "../application/usecases/apartments/DeleteApartmentUseCase.js";

import CreateResidentUseCase from "../application/usecases/residents/CreateResidentUseCase.js";
import ReadResidentUseCase from "../application/usecases/residents/ReadResidentUseCase.js";
import UpdateResidentUseCase from "../application/usecases/residents/UpdateResidentUseCase.js";
import DeleteResidentUseCase from "../application/usecases/residents/DeleteResidentUseCase.js";

import CreatePaymentUseCase from "../application/usecases/payments/CreatePaymentUseCase.js";
import ReadPaymentUseCase from "../application/usecases/payments/ReadPaymentUseCase.js";
import UpdatePaymentUseCase from "../application/usecases/payments/UpdatePaymentUseCase.js";
import DeletePaymentUseCase from "../application/usecases/payments/DeletePaymentUseCase.js";
// ====================================================================================

class DependencyInjection {
  static setup = () => {
    const __dirname = getCurrentDirname(import.meta.url);
    const privatePemPath = path.resolve(__dirname, "../../keys/private.pem");
    const publicPemPath = path.resolve(__dirname, "../../keys/public.pem");

    // packages =======================================================================
    const jsonWebToken = new JsonWebToken(
      fs.readFileSync(privatePemPath),
      fs.readFileSync(publicPemPath)
    );
    const securityService = new SecurityService();
    // =================================================================================

    // repositories ====================================================================
    const userRepository = new UserRepository(User);
    const userTokenRepository = new UserTokenRepository(UserToken);
    const apartmentRepository = new ApartmentRepository(Apartment);
    const residentRepository = new ResidentRepository(Resident);
    const paymentRepository = new PaymentRepository(Payment);
    // =================================================================================

    // services ========================================================================
    const authServices = new AuthServices({
      userRepository,
      userTokenRepository,
      securityService,
      jsonWebToken,
    });
    const residentsServices = new ResidentsServices({
      residentRepository,
    });
    const apartmentsServices = new ApartmentsServices({
      apartmentRepository,
      residentsServices,
    });
    const paymentsServices = new PaymentsServices({
      paymentRepository,
    });
    // =================================================================================

    // use cases =======================================================================
    const loginUseCase = new LoginUseCase({ authServices });
    const registerUseCase = new RegisterUseCase({ authServices });
    const refreshTokenUseCase = new RefreshTokenUseCase({ authServices });
    const logoutUseCase = new LogoutUseCase({ authServices });

    const createApartmentUseCase = new CreateApartmentUseCase({
      apartmentsServices,
    });
    const readApartmentUseCase = new ReadApartmentUseCase({
      apartmentsServices,
    });
    const updateApartmentUseCase = new UpdateApartmentUseCase({
      apartmentsServices,
    });
    const deleteApartmentUseCase = new DeleteApartmentUseCase({
      apartmentsServices,
    });

    const createResidentUseCase = new CreateResidentUseCase({
      residentsServices,
    });
    const readResidentUseCase = new ReadResidentUseCase({
      residentsServices,
    });
    const updateResidentUseCase = new UpdateResidentUseCase({
      residentsServices,
    });
    const deleteResidentUseCase = new DeleteResidentUseCase({
      residentsServices,
    });

    const createPaymentUseCase = new CreatePaymentUseCase({
      paymentsServices,
    });
    const readPaymentUseCase = new ReadPaymentUseCase({
      paymentsServices,
    });
    const updatePaymentUseCase = new UpdatePaymentUseCase({
      paymentsServices,
    });
    const deletePaymentUseCase = new DeletePaymentUseCase({
      paymentsServices,
    });
    // =================================================================================

    // controllers =====================================================================
    const authController = new AuthController({
      loginUseCase,
      registerUseCase,
      logoutUseCase,
      refreshTokenUseCase,
    });
    const apartmentsController = new ApartmentsController({
      createApartmentUseCase,
      readApartmentUseCase,
      updateApartmentUseCase,
      deleteApartmentUseCase,
    });
    const residentsController = new ResidentsController({
      createResidentUseCase,
      readResidentUseCase,
      updateResidentUseCase,
      deleteResidentUseCase,
    });

    const paymentsController = new PaymentsController({
      createPaymentUseCase,
      readPaymentUseCase,
      updatePaymentUseCase,
      deletePaymentUseCase,
    });
    // =================================================================================

    // middlewares =====================================================================
    const authMiddleware = new AuthMiddleware({ authServices });
    // =================================================================================

    const dependencies = [
      { name: "jsonWebToken", instance: jsonWebToken },
      { name: "securityService", instance: securityService },
      { name: "userRepository", instance: userRepository },
      { name: "userTokenRepository", instance: userTokenRepository },
      { name: "apartmentRepository", instance: apartmentRepository },
      { name: "residentRepository", instance: residentRepository },
      { name: "paymentRepository", instance: paymentRepository },
      { name: "authService", instance: authServices },
      { name: "apartmentsServices", instance: apartmentsServices },
      { name: "residentsServices", instance: residentsServices },
      { name: "paymentsServices", instance: paymentsServices },
      { name: "loginUseCase", instance: loginUseCase },
      { name: "registerUseCase", instance: registerUseCase },
      { name: "refreshTokenUseCase", instance: refreshTokenUseCase },
      { name: "logoutUseCase", instance: logoutUseCase },
      { name: "createApartmentUseCase", instance: createApartmentUseCase },
      { name: "readApartmentUseCase", instance: readApartmentUseCase },
      { name: "updateApartmentUseCase", instance: updateApartmentUseCase },
      { name: "deleteApartmentUseCase", instance: deleteApartmentUseCase },
      { name: "createResidentUseCase", instance: createResidentUseCase },
      { name: "readResidentUseCase", instance: readResidentUseCase },
      { name: "updateResidentUseCase", instance: updateResidentUseCase },
      { name: "deleteResidentUseCase", instance: deleteResidentUseCase },
      { name: "createPaymentUseCase", instance: createPaymentUseCase },
      { name: "readPaymentUseCase", instance: readPaymentUseCase },
      { name: "updatePaymentUseCase", instance: updatePaymentUseCase },
      { name: "deletePaymentUseCase", instance: deletePaymentUseCase },
      { name: "authController", instance: authController },
      { name: "apartmentsController", instance: apartmentsController },
      { name: "residentsController", instance: residentsController },
      { name: "paymentsController", instance: paymentsController },
      { name: "authMiddleware", instance: authMiddleware },
    ];

    dependencies.forEach((dependency) => {
      container.register(dependency.name, dependency.instance);
    });
  };
}

export default DependencyInjection;
