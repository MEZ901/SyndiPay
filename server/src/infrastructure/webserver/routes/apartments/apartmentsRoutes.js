import { Router } from "express";
import container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../interceptors/asyncHandler.js";

const apartmentsRoutes = Router();
const apartmentsController = container.resolve("apartmentsController");

apartmentsRoutes.get("/", asyncHandler(apartmentsController.getAll));

apartmentsRoutes.get("/:id", asyncHandler(apartmentsController.getById));

apartmentsRoutes.post("/", asyncHandler(apartmentsController.createApartment));

apartmentsRoutes.put(
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

apartmentsRoutes.delete(
  "/:id",
  asyncHandler(apartmentsController.deleteApartment)
);

export default apartmentsRoutes;
