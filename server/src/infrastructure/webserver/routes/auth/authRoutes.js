import { Router } from "express";
import container from "../../../../ioc-container/Container.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const authRoutes = Router();
const authController = container.resolve("authController");

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: APIs related to user authentication
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Register a new user with provided credentials.
 *     responses:
 *       '200':
 *         description: User registration successful
 */
authRoutes.post("/register", asyncHandler(authController.register));

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login as a user
 *     description: Log in using user credentials to obtain access.
 *     responses:
 *       '200':
 *         description: User logged in successfully
 */
authRoutes.post("/login", asyncHandler(authController.login));

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logout user
 *     description: Logout and invalidate the user's session.
 *     responses:
 *       '200':
 *         description: User logged out successfully
 */
authRoutes.post("/logout", asyncHandler(authController.logout));

/**
 * @openapi
 * /auth/refresh-token:
 *   post:
 *     tags: [Authentication]
 *     summary: Refresh user token
 *     description: Refresh the user's access token.
 *     responses:
 *       '200':
 *         description: Access token refreshed successfully
 */
authRoutes.post("/refresh-token", asyncHandler(authController.refreshToken));

export default authRoutes;
