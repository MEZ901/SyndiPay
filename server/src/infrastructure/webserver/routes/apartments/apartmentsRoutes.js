import { Router } from "express";
import Container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../interceptors/asyncHandler.js";

const apartmentsRoutes = Router();
const container = Container.getInstance();
const apartmentsController = container.resolve("apartmentsController");

apartmentsRoutes
  .route("/")
  .get(asyncHandler(apartmentsController.getAllApartments))
  .post(asyncHandler(apartmentsController.createApartment));

apartmentsRoutes
  .route("/:id")
  .get(asyncHandler(apartmentsController.getApartmentById))
  .patch(asyncHandler(apartmentsController.updateApartment))
  .delete(asyncHandler(apartmentsController.deleteApartment));

apartmentsRoutes.delete(
  "/force/:id",
  asyncHandler(apartmentsController.forceDeleteApartment)
);

export default apartmentsRoutes;
