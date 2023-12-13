import { Router } from "express";
import container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../interceptors/asyncHandler.js";

const apartmentsRoutes = Router();
const apartmentsController = container.resolve("apartmentsController");

apartmentsRoutes.get("/", asyncHandler(apartmentsController.getAllApartments));

apartmentsRoutes.get(
  "/:id",
  asyncHandler(apartmentsController.getApartmentById)
);

apartmentsRoutes.post("/", asyncHandler(apartmentsController.createApartment));

apartmentsRoutes.patch(
  "/:id",
  asyncHandler(apartmentsController.updateApartment)
);

apartmentsRoutes.delete(
  "/:id",
  asyncHandler(apartmentsController.deleteApartment)
);

apartmentsRoutes.delete(
  "/force/:id",
  asyncHandler(apartmentsController.forceDeleteApartment)
);

export default apartmentsRoutes;
