import { Router } from "express";
import Container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../interceptors/asyncHandler.js";

const residentsRoutes = Router();
const container = Container.getInstance();
const residentsController = container.resolve("residentsController");

residentsRoutes
  .route("/")
  .get(asyncHandler(residentsController.getAllResidents))
  .post(asyncHandler(residentsController.createResident));

residentsRoutes
  .route("/:id")
  .get(asyncHandler(residentsController.getResidentById))
  .patch(asyncHandler(residentsController.updateResident))
  .delete(asyncHandler(residentsController.deleteResident));

residentsRoutes.delete(
  "/force/:id",
  asyncHandler(residentsController.forceDeleteResident)
);

export default residentsRoutes;
