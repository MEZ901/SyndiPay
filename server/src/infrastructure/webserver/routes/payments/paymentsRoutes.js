import { Router } from "express";
import Container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../interceptors/asyncHandler.js";

const paymentsRoutes = Router();
const container = Container.getInstance();
const paymentsController = container.resolve("paymentsController");

paymentsRoutes
  .route("/")
  .get(asyncHandler(paymentsController.getAllPayments))
  .post(asyncHandler(paymentsController.createPayment));

paymentsRoutes
  .route("/:id")
  .get(asyncHandler(paymentsController.getPaymentById))
  .patch(asyncHandler(paymentsController.updatePayment))
  .delete(asyncHandler(paymentsController.deletePayment));

paymentsRoutes.delete(
  "/force/:id",
  asyncHandler(paymentsController.forceDeletePayment)
);

export default paymentsRoutes;
